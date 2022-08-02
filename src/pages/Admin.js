/* eslint-disable */

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { fetchBackend } from '../FetchConfig';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

// add course
function submitAdmin(e) {
  e.preventDefault();

  // get form data as JSON
  const data = new FormData(e.target);
  let jsonData = {};
  data.forEach((value, key) => jsonData[key] = value);

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsonData)
  };

  fetchBackend('/admin', requestOptions)
    .then(
      response => response.json()
    ).then(jsonOutput => {
    alert(JSON.stringify(jsonOutput));
  })
}

const Admin = () => (
  <Main
    title="Admin"
    // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
  >
    <header>
      <div className="title">
        <h2 data-testid="heading"><Link to="/admin">Admin</Link></h2>
      </div>
    </header>
    <form onSubmit={submitAdmin}>
      <div className="container">
        <label htmlFor="request_type">Choose a request type:</label>
        <select id="request_type" name="request_type">
          <option value="update_google_location_share_link">Update Google Share Link</option>
          {/*<option value="refresh_instagram_highlight">Refresh Instagram Highlight</option>*/}
          <option value="fetch_new_strava_activities">Fetch New Strava Activities</option>
          <option value="delete_recent_strava_activity">Delete Recent Strava Activity</option>
          <option value="update_strava_activity">Update Strava Activity (requires Strava activity ID)</option>
          <option value="delete_strava_activity">Delete Strava Activity (requires Strava activity ID)</option>
        </select>

        <label htmlFor="google_location_share_link"><b>Google Share Link</b></label>
        <input type="text" placeholder="Enter Google share link" name="google_location_share_link" />

        <label htmlFor="strava_activity_id"><b>Strava Activity ID</b></label>
        <input type="text" placeholder="Enter Strava activity ID" name="strava_activity_id" />

        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required />

        <button type="submit">Submit</button>
      </div>
    </form>
  </Main>
);

export default Admin;
