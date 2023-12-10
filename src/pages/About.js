/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import raw from 'raw.macro';
import PhotoAlbum from "react-photo-album";


import Main from '../layouts/Main';
import '../main.css'


const images = [
  'https://lh3.googleusercontent.com/lr/AAJ1LKepX0b3gphoYlJBiCUstfYjq7gZR6XbL-r-rMLgCIggo-hxoT9hHbtto73g6AjcIsqh4DxGR74YWGwTD4Ji2QlRCE6BZxpbF3jq4d4jglDYQelhoJSzWpm7XjQKMWxi18mib5Bp1jhUhfHFBRKewBHNs73rjcY0DtjYi7oAXTs1bXdjniLfwsXr3LSHfaYoAInGyeOVr3il5D4ToZxxUQwJ7e9V17zoI3H_ALAW5eYGKDFCAxrO1SUCIMNJ1sejTZ4_hffC4N9UUc6GhMYhPu_IJXL18PPOJKq9eh50vKal8MgtodJ07Xcec4WuFDKcbKr07SW-K9Nr6dIkjufIM1dxPRGBadqRGU7EOQA6yX9-xNBzuoM9YIYl6wWL8GzipJpXHnVbYMqVcvsG15djnsYBwXMnvtP_hBrXNIRf-EC8aLDnRqw7TykvKKHdO7t8IRPCb9wlMR2Udb08OWmissFP0yGSyJlDWpW1u8vLzWY5bjrcYYpSud6zliWk6NOC7ofSOwld0xRBYko8mnWI_Rlv7SMnram6YBpP9rRnhzKisbZLMMPhv2dhtZSXu2NCu8gRkG49Z3OB65C8jeCTENDtrwAfFJ9ZKfkmjAVTHsD9r6kY0IwcecMSB3h5A0pTUnVUPUvMecviqVhv-JU7LGHYFwhkKvnUlniyRkhHc9HOeivk2J78Deo3bP9F9Igy_LdJxPHZXIqkQdopZ7oogIwTJ6e7pXmkFURLV9kjQr9p_GSJCNRZHKgDkDimjXOW8iIofWLjqbOvWgaNFrN_Vug0YterlnCEDjqvRsB1dZ_swNQeoxKt9JZ4rA-Fml8CNTmA2sdJDy_MlMUg_LPsf4hpK8HeZ0ZOrw4wnoZqdO15DdaF26rbFqrI9ihsPCHGYoIB7_i40VI00vOxIl5qAzdWciykbowuJk5xNO2djNwBPub9ZZf9=w659-h879-s-no-gm',
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

function extractWidthHeight(url) {
  const match = url.match(/=w(\d+)-h(\d+)/); // Regex to match '=w' followed by numbers '-h' followed by numbers
  if (match) {
    const width = parseInt(match[1], 10); // Extract width and convert to integer
    const height = parseInt(match[2], 10); // Extract height and convert to integer
    return { width: width, height: height };
  }
  return { width: 500, height: 500 }; // Return null if pattern not found
}

const photos = images.map((image) => (
  {src: image, ...extractWidthHeight(image)}
));

console.log(photos)

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
      Outside of school, I have taken a great interest in the outdoors. Growing up, my father introduced me to scouting. At the end of high school, I finished a large community service project, earning me the rank of Eagle Scout. Cycling has always been a passion of mine from a young age. During my time in Boy Scouts, I started going on longer rides to complete the requirements for the cycling merit badge. I chose to combine my love of camping and cycling, leading to me taking overnight trips on the bike. Always wanting to push myself in the spirit of exploring the world, I decided to embark on my bike trip from Key West, FL to Prudhoe Bay, AK, among other trips. Beyond cycling, I like to hike (but that's often too slow for me) and go snowboarding (often too expensive).
      <hr />
      <div className="title">
        <h3 data-testid="heading">Please enjoy some photos of my dog...</h3>
      </div>
      {/*<ReactHlsPlayer src={'https://embed.storiesig.net/aHR0cHM6Ly9zY29udGVudC1pYWQzLTEuY2RuaW5zdGFncmFtLmNvbS92L3Q1MC4xMjQ0MS0xNi8yODY4ODYwODhfNTE0MjQ4ODUyNTg3MTk5N180Nzg4NjM3MzQ5MTUxNjQyNDc3X24ubXA0P2VmZz1leUp4WlY5bmNtOTFjSE1pT2lKYlhDSnBaMTl3Y205bmNtVnpjMmwyWlY5MWNteG5aVzR1Y0hKdlpIVmpkRjkwZVhCbExuTjBiM0o1WENKZEluMCZfbmNfaHQ9c2NvbnRlbnQtaWFkMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDEmX25jX29oYz1YQ0NzS3doX19OVUFYX19TWG5sJmVkbT1BTm1QN0dRQkFBQUEmY2NiPTctNSZvZT02MkI0QjRCNyZvaD0wMF9BVC1UdjFYdkdBTnRMRjZNNVpMNnZNcnFLcjhkUi1Cbkk1aUw4YmJuTnpVVmtBJl9uY19zaWQ9Mjc2MzYz'} playerRef={''}/>*/}
      <PhotoAlbum layout="columns" photos={photos} />
      {/* {images.map((url) => ( */}
      {/*   <img className={"dog-image"} src={url} alt="" /> */}
      {/* ))} */}
      Feel free to <Link to="/contact">contact</Link> me for more photos.
    </article>
  </Main>
);

export default About;
