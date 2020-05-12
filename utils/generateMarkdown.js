function generateMarkdown(readmeInfo) {
   //badge list if multiple badges
   var badgeList = "";
   for (i= 0; i < readmeInfo.badge.length; i++) {
       badgeList = badgeList + " " + "![License Image](" + readmeInfo.badge[i] + ")";
   }

 var markDownContent = `
# ${readmeInfo.projectName}
<hr/>
${badgeList}
## Description
${readmeInfo.projectDescription}
## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [License](#License)
4. [Contributing](#Contributing)
5. [Tests](#Tests)
6. [Questions](#Questions)
## Installation
To install necessary dependencies, run the following command(s):
\`\`\`
${readmeInfo.dependencies}
\`\`\`
## Usage
${readmeInfo.usage}
## License
This project is licensed under the ${readmeInfo.license.join(", ")} license(s).
## Contributing
${readmeInfo.contribute}
## Tests
To run tests, run the following command(s):
\`\`\`
${readmeInfo.tests}
\`\`\`
## Questions
![GitHub User Logo](${readmeInfo.gitImage})
If you have any questions about the repo, open an issue or contact **${readmeInfo.username}** directly at ${readmeInfo.email}.
 `;
 
//  "Username: " + readmeInfo.username + " " + readmeInfo.gitImage +
//  "\nEmail: " + readmeInfo.email + 
//  "\nProject Name: " + readmeInfo.projectName + 
//  "\nProject Description: " + readmeInfo.projectDescription + 
//  "\nLicense: " + badgeList +
//  "\nDependencies: " + readmeInfo.dependencies +
//  "\nTests: " + readmeInfo.tests +
//  "\nUsage: " + readmeInfo.usage +
//  "\nContributions: " + readmeInfo.contribute;
  return markDownContent;
}

module.exports = generateMarkdown;


// Heading 1 w/ project title 
// line 
// license badge 
