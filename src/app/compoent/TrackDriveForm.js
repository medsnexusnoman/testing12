// pages/trackdrive-form.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TrackDriveForm() {
  const [formData, setFormData] = useState({
    lead_token_id: 'f3b460b5-8195-4651-92dc-8b3562a61213',
    traffic_source_id: '1000',
    trackdrive_number_id: '+18882930839',
    caller_id: '+1',
    state: '',
    zip_code: '',
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseData(null);
    setError(null);

    try {
        const response = await axios.get(
            'https://zero-x-communications.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_aca_buyers', 
            { params: formData }
          );
      setResponseData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={{ backgroundImage: 'url(https://png.pngtree.com/background/20210714/original/pngtree-abstract-blue-technology-communication-concept-background-picture-image_1228905.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: '3rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#333', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '2px solid #007bff', paddingBottom: '0.5rem', textAlign: 'center' }}>ACA Ping/Post</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {responseData && (
          <div>
            <h4>API Response:</h4>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="lead_token_id">Lead Token ID</label>
            <input type="text" name="lead_token_id" id="lead_token_id" value={formData.lead_token_id} readOnly />
          </div>
          <div>
            <label htmlFor="traffic_source_id">Traffic Source ID</label>
            <input type="text" name="traffic_source_id" id="traffic_source_id" value={formData.traffic_source_id} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="trackdrive_number_id">TrackDrive Number ID</label>
            <input type="text" name="trackdrive_number_id" id="trackdrive_number_id" value={formData.trackdrive_number_id} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="caller_id">Caller ID</label>
            <input type="text" name="caller_id" id="caller_id" value={formData.caller_id} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="zip_code">Zip Code</label>
            <input type="text" name="zip_code" id="zip_code" value={formData.zip_code} onChange={handleChange} />
          </div>

          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '6px', transition: 'background-color 0.3s ease' }}>Submit</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>Back to Form</button>
        </div>
      </div>
    </div>
  );
}
