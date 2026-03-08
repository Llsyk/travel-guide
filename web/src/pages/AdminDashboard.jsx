import React, { useState, useEffect, Suspense, useRef } from 'react'; // Added useRef
import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame
import { OrbitControls, useTexture } from '@react-three/drei';

// --- 1. THE 3D PREVIEW COMPONENT ---
const Scene3D = ({ originalImage, depthMap }) => {
    const [colorTex, depthTex] = useTexture([originalImage, depthMap]);
    const meshRef = useRef(); // Create a reference to the mesh

    // useFrame runs 60 times per second
    useFrame((state) => {
        if (meshRef.current) {
            // Math.sin creates a smooth oscillation (back and forth)
            // state.clock.elapsedTime is a counter in seconds
            // 0.5 = speed of rotation | 0.3 = range of rotation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <mesh ref={meshRef}> {/* Attach the ref here */}
                <planeGeometry args={[5, 3.5, 128, 128]} />
                <meshStandardMaterial
                    map={colorTex}
                    displacementMap={depthTex}
                    displacementScale={0.8}
                />
            </mesh>
            <OrbitControls enableZoom={true} />
        </>
    );
};

const AdminDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [preview2D, setPreview2D] = useState(null);
    const [result3D, setResult3D] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetch('/locations.json')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(err => console.error("Error loading locations:", err));
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview2D(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!selectedId || !imageFile) return alert("Please select a location and image.");

        setLoading(true);
        const payload = new FormData();
        payload.append('data', JSON.stringify({ id: selectedId }));
        payload.append('image', imageFile);

        try {
            const res = await fetch('http://localhost:5000/api/add-location', {
                method: 'POST',
                body: payload
            });

            const result = await res.json();

            if (result.success) {
                const depthImageUrl = `http://localhost:5000/depth_maps/${selectedId}_depth.png?t=${Date.now()}`;
                setResult3D(depthImageUrl);
                alert("Success! 3D conversion complete.");
            } else {
                alert("Server error: " + result.error);
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-background min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Manage 3D Locations</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                <div className="space-y-6">
                    <select
                        className="w-full p-3 border rounded bg-card"
                        onChange={(e) => setSelectedId(e.target.value)}
                        value={selectedId}
                    >
                        <option value="">-- Select a Location ID --</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name} ({loc.id})</option>
                        ))}
                    </select>

                    <div className="border-2 border-dashed p-6 text-center">
                        <p className="mb-4">Upload 2D Image</p>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !selectedId}
                        className="w-full py-3 bg-primary text-white rounded hover:opacity-90 disabled:bg-gray-400"
                    >
                        {loading ? "Converting..." : "Convert to 3D"}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="border p-4">
                        <h2 className="font-bold mb-2 text-white">2D Input Preview</h2>
                        {preview2D ? (
                            <img src={preview2D} alt="2D Preview" className="h-48 w-full object-cover" />
                        ) : (
                            <div className="h-48 bg-gray-100 flex items-center justify-center">No image selected</div>
                        )}
                    </div>

                    {/* --- 2. THE 3D CANVAS SECTION --- */}
                    <div className="border p-4 h-[400px] bg-black relative">
                        <h2 className="font-bold mb-2 text-white">3D Output Result</h2>

                        {result3D ? (
                            <>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 text-white bg-black/50">
                                        Updating 3D Model...
                                    </div>
                                )}

                                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                    <Suspense fallback={null}>
                                        <Scene3D
                                            originalImage={preview2D}
                                            depthMap={result3D}
                                        />
                                    </Suspense>
                                </Canvas>
                            </>
                        ) : (
                            <div className="h-full bg-gray-800 flex items-center justify-center text-gray-400">
                                Awaiting conversion...
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminDashboard;