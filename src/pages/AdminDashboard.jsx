import React, { useState } from 'react';
import locations from '../data/locations.json';

const AdminDashboard = () => {
  const [selectedId, setSelectedId] = useState('');
  const [preview2D, setPreview2D] = useState(null);
  const [result3D, setResult3D] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null); // Keep track of the actual file object

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file object for the FormData
      const reader = new FileReader();
      reader.onloadend = () => setPreview2D(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId || !imageFile) return alert("Please select a location and image.");
    
    setLoading(true);

    const payload = new FormData();
    // Wrap your ID in a simple object if your API expects JSON under 'data'
    payload.append('data', JSON.stringify({ id: selectedId }));
    payload.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:5000/api/add-location', {
        method: 'POST',
        body: payload
      });
      
      const result = await res.json();
      
      if (result.success) {
        // Construct the URL to your Flask server
        // Replace '5000' if your port is different
        const depthImageUrl = `http://localhost:5000/depth_maps/${selectedId}_depth.png`;
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
        {/* Left Column: Input Selection */}
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
            disabled={loading || !selectedId}
            className="w-full py-3 bg-primary text-white rounded hover:opacity-90 disabled:bg-gray-400"
          >
            {loading ? "Converting..." : "Convert to 3D"}
          </button>
        </div>

        {/* Right Column: Previews */}
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4">
            <h2 className="font-bold mb-2">2D Input</h2>
            {preview2D ? <img src={preview2D} alt="2D Preview" className="h-48 w-full object-cover" /> : <div className="h-48 bg-gray-100 flex items-center justify-center">No image selected</div>}
          </div>
          
          <div className="border p-4">
            <h2 className="font-bold mb-2">3D Output Result</h2>
            {result3D ? <img src={result3D} alt="3D Result" className="h-48 w-full object-cover" /> : <div className="h-48 bg-gray-100 flex items-center justify-center">Awaiting conversion...</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;