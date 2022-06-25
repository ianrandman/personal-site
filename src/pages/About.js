/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import raw from 'raw.macro';

import Main from '../layouts/Main';
import '../blog.css'


// uses babel to load contents of file
// const markdown = raw('../data/about.md');

// const count = markdown.split(/\s+/)
//   .map((s) => s.replace(/\W/g, ''))
//   .filter((s) => s.length).length;

// Make all hrefs react router links
// const LinkRenderer = ({ ...children }) => <Link {...children} />;
const images = [
  // "https://lh3.googleusercontent.com/hdm0EhEaOHHuL6aRBW2oJuDbxReBpGbnoctRqIHr8ujyBKdLS11hG3IAT8r4W3Q9yBJqZWBgMeyH8XwIH0VU1AAK0_REEQRWHb7_4QJulU3IXGG4JZUepVJ9eHCRCclVRSMM-QGl7_E",
  // "https://lh3.googleusercontent.com/C11Ec1b-fCMZGk2x4NJs7o8sh8JeCVnd1jxvAY51MfWhJdMJseIJDDAVeDYjKi-HUZ9oId9NghPa3XI2DTJSdjHo0uhfGEicZ2o_wuN1m3bZwdDiAPkfqz-uGiE8ubPVTL2HCqkAWrE",
  "https://lh3.googleusercontent.com/fK3rC7PKyx_wopbzgfxT1CuNRlMCToUX-24PIXxPEtuAw4K74FeDbt_SlTiiB9FBAP9Y60V6gyUi6M7j2lrJ-ULdcFWYF9PlN7OYk0lzwIYsUqVN0HaOA5l1dty0oKoUx-vFXJ7xm_I",
  // "https://lh3.googleusercontent.com/Ma9IMU_VauTMDUYXhjpZYdez7SN0Ja_m1UDI2f5NBwc8aQW0OjlccjEW__tG9fHD-NffncPRQhO3R44UgPxlsFilXw2Lu18TJP5sh-xRaxwYlzg1qVRXN2K47GWyDkACsFQpN033SQE",
  "https://lh3.googleusercontent.com/ENTX71oZ8wQYWqJfNLfTxsBXfELc-07xb54i18fzrccDoXb1v2rc2f8ZHieRL-yi9UKnKmrvMo31digZhGR9C5D38QQd0AB8csPZlEmqgTgbA9dedYqo9bMAPt-cV_w6oAotdADa1sQ",
  "https://lh3.googleusercontent.com/-ZlRbQWHzaX-PBzR_wmFc1iT9_OI1gvUJrmx3QoAZc2d3zhfZ-IfciaxR3qMBEoOQS8mhkzUkPTcnWYLtbcS2wymusGas6LLwHXVYZFk8u4K7YV9TSBstHry3cCeHZerLmMHbzBTkpI",
  "https://lh3.googleusercontent.com/WRih3M1OAmm66lnMBqyfCR48m4UKwa9XkEEinNGJg_cW5G_ztP4a7D7nuGGpEzMlO25pxL543a4Xsd2lWXxfkKdwxklzbR6y-tOKxUT5wBh5wlC33k2ab_eXHsR0zVO0HaGkqukezJ4",
  "https://lh3.googleusercontent.com/fu5z4BGBv16khztOMqCA9OuzGAHx8RPwBBlj1ZVA65OiYCPntnDRdfDDzXU6N-Q6ezfWzIdSyhP93wrr5lTfguV5p2kONXjN2TWmkYfPK8JZFmWAzhQkOaMvG-Ga2PS9iLWinkRiulY",
  "https://lh3.googleusercontent.com/zkuqiPnwhDJU-xfgfGKIH3795VzmQDlBktK34nSbAYOY-Vpgkj1aK5EoDCGHerw-ROyRl7ue0lVwrYuBQW8mQElV1z6d9Bkqv59ASZ0JPuHC41twk7n-MN5FE_VVxLnags2Nfd0eRAM",
  "https://lh3.googleusercontent.com/bRZP5J4_C-cjaUn0pEHxW15aYw08c47chYP-xykAjOjqISKY3VPi-np04xO7LW0BjTD6atSbDX3E_fjwSmHnkiN7lPrfpke3CVNLnWacq1dYpAp9ER4sgIBdKE0iCBLxHHNdctfHX28",
  "https://lh3.googleusercontent.com/p5-pMUSUM0-wumZMqTxSHkwnGyXiaAqN_xUl5tNBPj54tM0f3LHy2hNJ_9Hbh2ocJoBw6LCWKxrvFlXuZO4VD3IXJIKT6_S8GJhGmNHZ9LbxqvFlQD8ngqxO_afVUb47RnJvH4CiYN8",
  "https://lh3.googleusercontent.com/NqjxUpwJVM5EB0Zr20yFKzEbLBXxNCOwahz_V202PvS0FVGSWiiqJ8Cm2edD1qvmSmfGOdxg0RW_Pqrjx9Gh2PcgYLAj4ab92-pzXxWIK6kYUB3BTwN895JbzkbIw0XXo1yZNudlX8o",
  "https://lh3.googleusercontent.com/fPSwNe2rLOoXZGcaFXLoOmPI0w5Rv1m2vRZaOmBLrbv68WXKrwTAxkO5-mIzBsfF3Jxu2AenWnxVlzhZOqUObnmf1lW0Tb3yOSCpaXEHHA9WgV1x6Ky93_FeFDXN3i3AKE5eq05jhV0",
  // "https://lh3.googleusercontent.com/OXpcpKECRw398qfWPVlEG300TZDHlWVFo7zSlqMY_mVwjx1tieKczmqt8Xz4EiEJxzAZo6cK5C_8_Z-vAc-NroQtSa2_YKfPfJbw1lmpZKE0Jf1j9U662I5Av_Bu9SGM3wxlQdaDNio",
  "https://lh3.googleusercontent.com/Yz5qxLVS9aGhB04DxcrizEti-1JRsTLGJJL9E1bdZVHTkXaRcE5wBYezVwfpnWHOcquOKjS_oMz9rghPf-oi4Zzpkbl7_UMKy0s_zkAozkGJ9IdivvcmUlw9Y9UkX5d32CyqOjpJpNU"
];


const About = () => (
  <Main
    title="About"
    description="Learn about Ian Randman"
  >
    <article className="post markdown" id="about">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/about">About Me</Link></h2>
        </div>
      </header>
      <div className="title">
        <h3 data-testid="heading">Maybe I will fill this out some more later.
          Please enjoy some photos of my dog in the meantime...</h3>
      </div>
      {/*<ReactHlsPlayer src={'https://embed.storiesig.net/aHR0cHM6Ly9zY29udGVudC1pYWQzLTEuY2RuaW5zdGFncmFtLmNvbS92L3Q1MC4xMjQ0MS0xNi8yODY4ODYwODhfNTE0MjQ4ODUyNTg3MTk5N180Nzg4NjM3MzQ5MTUxNjQyNDc3X24ubXA0P2VmZz1leUp4WlY5bmNtOTFjSE1pT2lKYlhDSnBaMTl3Y205bmNtVnpjMmwyWlY5MWNteG5aVzR1Y0hKdlpIVmpkRjkwZVhCbExuTjBiM0o1WENKZEluMCZfbmNfaHQ9c2NvbnRlbnQtaWFkMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDEmX25jX29oYz1YQ0NzS3doX19OVUFYX19TWG5sJmVkbT1BTm1QN0dRQkFBQUEmY2NiPTctNSZvZT02MkI0QjRCNyZvaD0wMF9BVC1UdjFYdkdBTnRMRjZNNVpMNnZNcnFLcjhkUi1Cbkk1aUw4YmJuTnpVVmtBJl9uY19zaWQ9Mjc2MzYz'} playerRef={''}/>*/}
      {images.map((url) => (
        <img className={"dog-image"} src={url} alt="" />
      ))}
    </article>
  </Main>
);

export default About;
