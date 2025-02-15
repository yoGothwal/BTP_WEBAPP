import React from 'react'

const About = () => {
  return (
    <div><font size="2">
    <h5>Acknowledgements</h5>

    <p>
      This webtool uses the pyStrata python package (Kottke, 2019) to
      conduct site response calculations. We thank Dr. Albert R. Kottke
      for his support with pyStrata during the development of this
      project.
    </p>

    <p>
      {" "}
      The development of this webtool was funded under agreement No.
      1020-007 between UC Davis and the Department of Conservation for the
      California Strong Motion Instrumentation Program (CSMIP) Data
      Interpretation Project “Broadening the Utilization of CSMIP Data:
      Double Convolution Methodology Towards Developing Input Motions for
      Site Response and Nonlinear Deformation Analyses.” Any opinions,
      findings, conclusions, or recommendations expressed herein are those
      of the authors and do not necessarily represent the views of this
      organization.
    </p>

    <h5>Contact</h5>

    <p>
      {" "}
      We appreciate hearing from users, so please do send us an email
      (skssinha at ucdavis.edu, rpretell at ucdavis.edu, or kziotopoulou
      at ucdavis.edu) and let us know about your applications and
      experiences. Interested readers are referred to the below
      publications for details about the background and applications.{" "}
    </p>

    <h5>References</h5>
    <ul>
      <li>
        Pretell R., Sinha S.K., Ziotopoulou K., and Watson-Lamprey J.A.
        (2021).{" "}
        <i>
          {" "}
          Broadening the utilization of CSMIP data: Double convolution
          methodology towards developing input motions for site response
          and nonlinear deformation analyses.
        </i>{" "}
        In Proceedings of SMIP 2021 Seminar on Utilization of
        Strong-Motion Data (SMIP21), California Geological Survey. (
        <a
          target="_blank"
          href="https://www.conservation.ca.gov/cgs/Documents/Program-SMIP/Seminar/SMIP21-P1-Paper-by-Ziotopoulou-a11y.pdf"
        >
          pdf
        </a>
        )
      </li>
      <li>
        Pretell R., Ziotopoulou K., and Abrahamson N. (2019).{" "}
        <i>
          {" "}
          Methodology for the development of input motions for nonlinear
          deformation analyses
        </i>
        . In Proceedings of 7<sup>th</sup> International Conference on
        Earthquake Geotechnical Engineering (ICEGE), Rome, Italy. (
        <a
          target="_blank"
          href="https://www.issmge.org/uploads/publications/59/104/ch507.pdf"
        >
          pdf
        </a>
        ){" "}
      </li>
    </ul>
  </font></div>
  )
}

export default About