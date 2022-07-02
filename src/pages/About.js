/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import raw from 'raw.macro';

import Main from '../layouts/Main';
import '../main.css'


// uses babel to load contents of file
// const markdown = raw('../data/about.md');

// const count = markdown.split(/\s+/)
//   .map((s) => s.replace(/\W/g, ''))
//   .filter((s) => s.length).length;

// Make all hrefs react router links
// const LinkRenderer = ({ ...children }) => <Link {...children} />;
// const images = [
//   // "https://lh3.googleusercontent.com/hdm0EhEaOHHuL6aRBW2oJuDbxReBpGbnoctRqIHr8ujyBKdLS11hG3IAT8r4W3Q9yBJqZWBgMeyH8XwIH0VU1AAK0_REEQRWHb7_4QJulU3IXGG4JZUepVJ9eHCRCclVRSMM-QGl7_E",
//   // "https://lh3.googleusercontent.com/C11Ec1b-fCMZGk2x4NJs7o8sh8JeCVnd1jxvAY51MfWhJdMJseIJDDAVeDYjKi-HUZ9oId9NghPa3XI2DTJSdjHo0uhfGEicZ2o_wuN1m3bZwdDiAPkfqz-uGiE8ubPVTL2HCqkAWrE",
//   "https://lh3.googleusercontent.com/fK3rC7PKyx_wopbzgfxT1CuNRlMCToUX-24PIXxPEtuAw4K74FeDbt_SlTiiB9FBAP9Y60V6gyUi6M7j2lrJ-ULdcFWYF9PlN7OYk0lzwIYsUqVN0HaOA5l1dty0oKoUx-vFXJ7xm_I",
//   // "https://lh3.googleusercontent.com/Ma9IMU_VauTMDUYXhjpZYdez7SN0Ja_m1UDI2f5NBwc8aQW0OjlccjEW__tG9fHD-NffncPRQhO3R44UgPxlsFilXw2Lu18TJP5sh-xRaxwYlzg1qVRXN2K47GWyDkACsFQpN033SQE",
//   "https://lh3.googleusercontent.com/ENTX71oZ8wQYWqJfNLfTxsBXfELc-07xb54i18fzrccDoXb1v2rc2f8ZHieRL-yi9UKnKmrvMo31digZhGR9C5D38QQd0AB8csPZlEmqgTgbA9dedYqo9bMAPt-cV_w6oAotdADa1sQ",
//   "https://lh3.googleusercontent.com/-ZlRbQWHzaX-PBzR_wmFc1iT9_OI1gvUJrmx3QoAZc2d3zhfZ-IfciaxR3qMBEoOQS8mhkzUkPTcnWYLtbcS2wymusGas6LLwHXVYZFk8u4K7YV9TSBstHry3cCeHZerLmMHbzBTkpI",
//   "https://lh3.googleusercontent.com/WRih3M1OAmm66lnMBqyfCR48m4UKwa9XkEEinNGJg_cW5G_ztP4a7D7nuGGpEzMlO25pxL543a4Xsd2lWXxfkKdwxklzbR6y-tOKxUT5wBh5wlC33k2ab_eXHsR0zVO0HaGkqukezJ4",
//   "https://lh3.googleusercontent.com/fu5z4BGBv16khztOMqCA9OuzGAHx8RPwBBlj1ZVA65OiYCPntnDRdfDDzXU6N-Q6ezfWzIdSyhP93wrr5lTfguV5p2kONXjN2TWmkYfPK8JZFmWAzhQkOaMvG-Ga2PS9iLWinkRiulY",
//   "https://lh3.googleusercontent.com/zkuqiPnwhDJU-xfgfGKIH3795VzmQDlBktK34nSbAYOY-Vpgkj1aK5EoDCGHerw-ROyRl7ue0lVwrYuBQW8mQElV1z6d9Bkqv59ASZ0JPuHC41twk7n-MN5FE_VVxLnags2Nfd0eRAM",
//   "https://lh3.googleusercontent.com/bRZP5J4_C-cjaUn0pEHxW15aYw08c47chYP-xykAjOjqISKY3VPi-np04xO7LW0BjTD6atSbDX3E_fjwSmHnkiN7lPrfpke3CVNLnWacq1dYpAp9ER4sgIBdKE0iCBLxHHNdctfHX28",
//   "https://lh3.googleusercontent.com/p5-pMUSUM0-wumZMqTxSHkwnGyXiaAqN_xUl5tNBPj54tM0f3LHy2hNJ_9Hbh2ocJoBw6LCWKxrvFlXuZO4VD3IXJIKT6_S8GJhGmNHZ9LbxqvFlQD8ngqxO_afVUb47RnJvH4CiYN8",
//   "https://lh3.googleusercontent.com/NqjxUpwJVM5EB0Zr20yFKzEbLBXxNCOwahz_V202PvS0FVGSWiiqJ8Cm2edD1qvmSmfGOdxg0RW_Pqrjx9Gh2PcgYLAj4ab92-pzXxWIK6kYUB3BTwN895JbzkbIw0XXo1yZNudlX8o",
//   "https://lh3.googleusercontent.com/fPSwNe2rLOoXZGcaFXLoOmPI0w5Rv1m2vRZaOmBLrbv68WXKrwTAxkO5-mIzBsfF3Jxu2AenWnxVlzhZOqUObnmf1lW0Tb3yOSCpaXEHHA9WgV1x6Ky93_FeFDXN3i3AKE5eq05jhV0",
//   // "https://lh3.googleusercontent.com/OXpcpKECRw398qfWPVlEG300TZDHlWVFo7zSlqMY_mVwjx1tieKczmqt8Xz4EiEJxzAZo6cK5C_8_Z-vAc-NroQtSa2_YKfPfJbw1lmpZKE0Jf1j9U662I5Av_Bu9SGM3wxlQdaDNio",
//   "https://lh3.googleusercontent.com/Yz5qxLVS9aGhB04DxcrizEti-1JRsTLGJJL9E1bdZVHTkXaRcE5wBYezVwfpnWHOcquOKjS_oMz9rghPf-oi4Zzpkbl7_UMKy0s_zkAozkGJ9IdivvcmUlw9Y9UkX5d32CyqOjpJpNU"
// ];
const images = [
  'https://lh3.googleusercontent.com/pw/AM-JKLWEPrk22dVj_aV6__iiEIHwjUP3CMiW-0uFuk2ZEHnXOBNNHdAYP5jC0Oe4GKsp5YvyDl7suCvzinX-91RDvoJCgvZk1bgnZgXkzJeUetBFVhKlNY2IiKAUbMOO4oFyO9G1-KcvwMV5rvToRxGlmntCLg=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLVS2OVh9ecgLCn7fhIs7EOPjAYxna9ZTCenn3NHLw4G67F-Tic-FDHcAuHBqDMJjWqKPuroxWE7537fKoEKD5dGzvA28m_U4-3t-6RzTy6OuMeST7sx2KMQMt7iv4WPEH7YuGyKcTG69WFLLt8quLzRCw=w418-h903-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLXjTOUEFRiQ7_NqNtlFJ9LDb6M2suyk1iQt1_KPwnGT_KYVEm8PQOylnM5pPyQ59U5aA6mXy3rbP4mt63UgkNtTF317tqyi6bN3i9gh0DrEy2HdAN39syXOE_oXjtqLGIcBt-QeKauQzyzEJlUx0_mPJg=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLVrCt5LMzDNln3g3Br1myoZjoL-1M7svnRgGlHuhvVWmTvQu1Ti_VeMxoHCcG54xuHUS_8E-ePG8pq2w9CPhrddOzBz3d5dTQT1WptO83Da_WOXv_jXrH3XIqP6OVZFJHrV7BgD9418f0jwvnFl9ZUYQA=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLVXpkkRs533xT0bb4dd_GD1pqe4Fv6Qi-4wRLG7ruJYk5ch6XbDfKrOwf0aJin4sT1D8abOudqRaWwwIVFw_JWq4hIrxYW5NsgkKFSsAQgRa-X9NIffeWDovvbvypDsiI--SbVgPbbA_m-bVQ_vLy4NJA=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLW4ne9Gw7gpYBEq52WIMjL8M7R4eV6U6d3xHBkdJHP9FIZre-PGL4fgNSeA07uMzF4MBcWeJ4pKkkIZYcgIeYo5lPz1Hymsvvhc-sbqbtr5NqWdE4bCKqhLv0RzxedT8c-mbbZvMOF-2_LQlmmmjuXNaw=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLWPNLMzJzQzqvuuE33EiEu3HsT-juJNdJopLazG3hx7saptuYomagCtU-xogEyAteWJC6XGLaZNiYUqylA1kBsI2uGUHmkS5lg1miOldydGmWjpulkrOgFXOj7hEAuSopJIDF5Fqa6dq5yiDJr6W5pFTg=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLXBXMe6pqHSugggLivktYKwIAxK532aanP5PW3ZtYDCrXLI6fOcglUSk1yvOQahTmpwoV2tbMilcsfwWiCvGwQfLgiibkJ1zdBiHQ6NyYoweJ4GcgQaY7okIvn8lFZPzaZrnJKTimVqjhGyDrHHQk3V-A=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLVN4oTGvZvMGTMQ3g7n0U1QQPeYxfR_u4IK3kJCxExxcHq7Fcw8Y2fIV9Rvv3Q6Mn6me9Yg8Zrr1nthwfBVs3UR6nsb_yHLBa35XfqDyefPS9yYSXOxV7RA4aHO3qsmJenpon-_hXeSbu0ZYFKiA8GepQ=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLV9siYVYbZxZiKtQY12UHUUrlqv3em1gvnBHOiF1y_dhAXxkJzLtVChGAzR9Y7QxLMpRe2CS7L2264FMJsQgbrhiZeJo-RuDcCxwaGH5iqu5YzF8c1CCjkx6a9C-W7eHo6K7T83pw8OXPmSpy_K6Bu9xA=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLUdUXC2XqgMKXB-T_I-9p1KJippxrUYAl8KKGWpFqWwQTL-NDW9nx7tKPMGwfvj2lzah90EE0uX4Gn6mBj8weTGeqw61uhXXXcDnwbXKJ7zWOoURiCiXSoqaHj5BiA-tk0Qp5IbFhZ5M-gIxm6MTR6H0A=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLXCn4V2PkFWGYa7noshqVJRszY5l0vK1_-XtaLSXhjlpaqxeWqgWsvvYsF__Ay8C0NEW1OqgyC72iCvZleVSqqbuQvStfvjmXq6LQiI_Y7rMzvtgBJkfhij0auE2wLw1V5kC9Ml6rUwh-U_5DXQw1w3Pw=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLW9Hl4bboxVWrDKQogOB4-BNouG_e0TfUDxuDF6LeDL6yh0fmdTh7XyemDiSKZIIdslpHKDO6NoQIlmAq8t8TTZbFlN6qFuv2EMrkjYAJ4UaFR15XxsGE8CR-C4lFf9fcSJ9T9Zqk-TEKYmLsMONUIsKw=w443-h903-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLVeLFaIkXmwA2nj8mprxrsm28j-mpoV_S5L22bgVERZI_gUHsy3ThtPRRY22jICP5NBtUNMDC7hktsTeBKAkiF74Rv_H4rUOii6csG2MtbDrN909kuWlmH-4m2xxjfo8GNbcvMH-_6iHf-pNEOH1EyVGw=w993-h745-no',
  'https://lh3.googleusercontent.com/pw/AM-JKLUXeUZk6Zk2NTKpxgbxACinZLxxsYZ3N0PeAiZQ0Ons1XaYwmn_qtWOpJteOzAj7YhWJxpiS20ivHLoXiWvNh4XG6tma-_MFdwHHWUrfpZ8sSlvzTVPO1P_u3voFnQ_oN37Tse86KJW6k-uqGV4Ldp1KA=s903-no',
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
      Always having an interest in computing and with a catalyst from my cousin, I began to take computer engineering courses online in high school. By the start of college, I decided to pursue an education in software, leading to a major in Software Engineering, with which I can maintain a more business-oriented career outlook, learning how to best integrate software with the lives of consumers. I eventually wanted the ability to make production-ready software while also being qualified to work in more novel areas, which lead to me completing my master's in Computer Science with a focus in intelligent systems.
      <br /><br />
      My skills include knowledge of the practical application of software, theoretical  aspects of computing, as well as computer hardware. My software engineering projects have taught me many of the processes used to create software for consumer use. Through computer science classes and projects, I have learned some of the limits of computing, including artificial intelligence, and have gained experience using the tools necessary to bring any software project to life. Finally, my courses and projects in computer engineering have given me a deeper understanding and appreciation of modern computing.
      <br /><br />
      Outside of school, I have taken a great interest in the outdoors. Growing up, my father introduced me to scouting. At the end of high school, I finished a large community service project, earning me the rank of Eagle Scout. Cycling has always been a passion of mine from a young age. During my time in Boy Scouts, I started going on longer rides to complete the requirements for the cycling merit badge. I chose to combine my love of camping and cycling, leading to me taking overnight trips on the bike. Always wanting to push myself in the spirit of exploring the world, I decided to embark on my bike trip from Key West, FL to Prudhoe Bay, AK. Beyond cycling, I like to hike (but that's often too slow for me) and go snowboarding (often too expensive).      <br /><br />
      <hr />
      <div className="title">
        <h3 data-testid="heading">Please enjoy some photos of my dog...</h3>
      </div>
      {/*<ReactHlsPlayer src={'https://embed.storiesig.net/aHR0cHM6Ly9zY29udGVudC1pYWQzLTEuY2RuaW5zdGFncmFtLmNvbS92L3Q1MC4xMjQ0MS0xNi8yODY4ODYwODhfNTE0MjQ4ODUyNTg3MTk5N180Nzg4NjM3MzQ5MTUxNjQyNDc3X24ubXA0P2VmZz1leUp4WlY5bmNtOTFjSE1pT2lKYlhDSnBaMTl3Y205bmNtVnpjMmwyWlY5MWNteG5aVzR1Y0hKdlpIVmpkRjkwZVhCbExuTjBiM0o1WENKZEluMCZfbmNfaHQ9c2NvbnRlbnQtaWFkMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDEmX25jX29oYz1YQ0NzS3doX19OVUFYX19TWG5sJmVkbT1BTm1QN0dRQkFBQUEmY2NiPTctNSZvZT02MkI0QjRCNyZvaD0wMF9BVC1UdjFYdkdBTnRMRjZNNVpMNnZNcnFLcjhkUi1Cbkk1aUw4YmJuTnpVVmtBJl9uY19zaWQ9Mjc2MzYz'} playerRef={''}/>*/}
      {images.map((url) => (
        <img className={"dog-image"} src={url} alt="" />
      ))}
      Feel free to <Link to="/contact">contact</Link> me for more photos.
    </article>
  </Main>
);

export default About;
