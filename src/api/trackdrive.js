// pages/api/trackdrive.js
'use client';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      traffic_source_id = '1000',
      trackdrive_number_id,
      caller_id = '6147254192',
      lead_token_id,
      state,
      zip_code,
    } = req.body;

    const url = 'https://zero-x-communications.trackdrive.com/api/v1/inbound_webhooks/ping/check_for_available_aca_buyers';

    try {
      const response = await axios.get(url, {
        params: {
          traffic_source_id,
          trackdrive_number: trackdrive_number_id,
          caller_id,
          lead_token_id,
          state,
          zip_code,
        },
        validateStatus: (status) => status < 500, // Accept only 2xx responses
      });

      if (response.status >= 200 && response.status < 300) {
        return res.status(200).json(response.data);
      } else {
        const errorMessage = response.data.message || 'An error occurred';
        return res.status(response.status).json({ error: errorMessage, details: response.data.errors || [] });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
