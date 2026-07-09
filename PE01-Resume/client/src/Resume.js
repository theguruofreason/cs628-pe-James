import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume">
      <header className="header">
        <h1>James Iden Busia</h1>
        <p>
          2626 Morse Merryman Rd SE, Olympia WA, 98501 | (564) 206-4837 |
          iden@ibusia.me
        </p>
      </header>

      <section className="education">
        <h2>Education</h2>
        <h3>Bachelor of Science with a concentration in Physiology</h3>
        <p>San Francisco State University, San Francisco CA | May 2015</p>
        <p>GPA: 3.27/4.0</p>
        <h3>Master of Science in Computer Science</h3>
        <p>City University of Seattle, Seattle WA | May 2028 (expected)</p>
        <p>GPA: 3.6/4.0</p>
      </section>
      <section className="skills">
        <h2>Skills</h2>
        <ul>
          <li>Programming Languages: Typescript/Javascript, Python, C#, C++</li>
          <li>Frameworks and Libraries: React, Preact, Node.js, Express.js</li>
          <li>Database Systems: SQL, MongoDB, Neo4j, Dgraph</li>
          <li>Operating Systems: Windows, Linux</li>
          <li>Version Control: Git</li>
        </ul>
      </section>
      <section className="experience">
        <h2>Work Experience</h2>
        <h3>Intermediate Software Engineer</h3>
        <p>Banjo Health | Nov 2024 - Nov 2025</p>
        <p>
          Delivered Tableau integration and Agent of Record interface using
          Javascript, SQL, and Azure Functions which drove new client
          acquisition and built trust with existing clients.
        </p>
        <p>
          Modernized front-end with JSX, JQuery, and React, eliminating bugs,
          adding functionality, and reducing page load times by 50%.
        </p>
        <p>
          Redesigned back end architecture using Typescript and Azure Functions
          to formalize business logic and data contracts while providing API
          documentation.
        </p>
        <h3>DexCare</h3>
        <p>
          Generated $2M+ in annual contracts by delivering multiple major
          releases, including new-client onboards of our Typescript/Nodejs, REST
          API, and SQL backend.
        </p>
        <p>
          Led a cross-team effort to create and maintain versioned data
          contracts, saving hundreds of developer hours and ensuring ease of
          extensibility and validation using OpenApi Spec in concert with our
          scalable Typescript/Javascript, Nodejs, and serverless Azure Function
          App backend architecture.
        </p>
        <p>
          Increased provider bookings by 20%+ through architecture redesigns,
          infrastructure improvements, behavior driven design, data ingestion
          and database management, and Typescript/Javascript development of the
          severless main search application.
        </p>
        <p>
          Initiated new product creation and developed Care Navigator, a
          client-configurable, scalable search layer written in Typescript
          guiding patients to better bookings through configurable categories
          and ML algorithms.
        </p>
        <p>
          Implemented Terraform scripts for creating and modifying cloud
          resources resulting in 90% reduction in time of client onboarding and
          100% incident elimination.
        </p>
        <p>
          Led and mentored a team of 3 using Agile methodologies that
          continuously delivered new and scalable features and products while
          maintaining existing products and executing new client releases.
        </p>
        <h3>MCG Health</h3>
        <p>
          Managed the production, integration, and release of updates for MCG's
          flagship Typescript, Nodejs software, Collaborative Care, resulting in
          $1M+ in annual contracts.
        </p>
        <p>
          Proposed and executed the transition of Collaborative Care from a
          synchronous, monolithic architecture to an asynchronous, microservices
          web application architecture featuring Typescript/Javascript,
          Expressjs, Nodejs REST APIs, and SQL and MongoDB databases,
          eliminating all transmission and data errors, increasing transaction
          processing speed by over 70%.
        </p>
        <p>
          Designed scalable web application data transmission and processing
          systems in Typescript and SQL to protect healthcare data in compliance
          with HIPAA standards.
        </p>
        <p>
          Transitioned Collaborative Care's CICD infrastructure to Microsoft
          Azure, saving $50,000+ annually.
        </p>
        <p>
          Implemented Terraform for cloud resource allocation and management
          resulting in 90% faster environment setup and eliminating
          configuration errors.
        </p>
        <p>
          Developed testing infrastructure for MCG’s Typescript/Nodejs web
          applications using modern testing frameworks like Mocha, Selenium, and
          JMeter.
        </p>
        <p>
          Collaborated with and performed knowledge transfers with team members
          on topics like testing, CICD, message buses, HL7, FHIR, health data
          interoperability, and distributed systems, producing comprehensive
          documentation.
        </p>
        <p>
          Encouraged and contributed to Agile practices to promote collaboration
          between clients and engineers for the continued development of MCG’s
          distributed systems and web applications.
        </p>
      </section>
      <section>
        <h2>Projects</h2>
        <div className="projects">
          <h3>Personal Website</h3>
          <p>
            Built a personal website using React and deployed it on GitHub Pages
          </p>
          <p>
            Source code:{" "}
            <a
              href="https://github.com/theguruofreason/personal-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/theguruofreason/personal-website
            </a>
          </p>
          <h3>Community - Social Network</h3>
          <p>
            Graph based social network with no feed algorithms. Made with
            Typescript, Node.js, and Dgraph.
          </p>
          <p>
            Source code:{" "}
            <a
              href="https://github.com/theguruofreason/community-be"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/theguruofreason/community-be
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resume;
