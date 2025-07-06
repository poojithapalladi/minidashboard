import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/business-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location }),
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const result = await res.json();
    setData({ ...result, name, location });
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not reach the backend. Please make sure it's running.");
  }
};

  const regenerateHeadline = async () => {
    const encodedName = encodeURIComponent(name);
    const encodedLocation = encodeURIComponent(location);

    const res = await fetch(
      `http://localhost:5000/regenerate-headline?name=${encodedName}&location=${encodedLocation}`
    );
    const result = await res.json();
    setData((prev) => ({ ...prev, headline: result.headline }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">Mini Business Dashboard</h1>
        <input
          type="text"
          placeholder="Business Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      {data && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-md text-center">
          <p className="text-xl font-semibold">{data.name} {data.location}</p>
          <p className="text-lg font-bold mt-2"> Rating: {data.rating}</p>
          <p className="text-md">💬 Reviews: {data.reviews}</p>
          <p className="text-sm italic mt-2">{data.headline}</p>
          <button
            onClick={regenerateHeadline}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
