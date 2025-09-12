import { createContext, type JSX, useContext } from "solid-js";

export interface IWorkbenchContext {
  content: string;
}

export const WorkbenchContext = createContext<IWorkbenchContext>({ content: "" });
const DEFAULT_CONTENT = `# H1 
<img align="right" src="https://github-readme-stats.vercel.app/api?username=rabbitkiller-dev&show_icons=true&icon_color=805AD5&text_color=718096&bg_color=ffffff&hide_title=true" />

#### Hello 👏

> my person site [https://rabbitkiller.dev](https://rabbitkiller.dev).  

![HTML5](https://img.shields.io/badge/-HTML5-%23E44D27?style=flat-square&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/-CSS3-%231572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/-JavaScript-%23FFC107?style=flat-square&logo=javascript&logoColor=000000&labelColor=%23FFC107&color=%23FFC107)
![TypeScript](https://img.shields.io/badge/-TypeScript-%23282C34?style=flat-square&logo=TypeScript&logoColor=%231572B6&labelColor=%23282C34&color=%23282C34)
![Angular](https://img.shields.io/badge/-Angular-%231572B6?style=flat-square&logo=Angular&logoColor=red&labelColor=%23E44D27f)
![Vue.js](https://img.shields.io/badge/-Vue.js-%232c3e50?style=flat-square&logo=Vue.js)
![React](https://img.shields.io/badge/-React-%23282C34?style=flat-square&logo=react)

![Node.js](https://img.shields.io/badge/-Node.js-%23282C34?style=flat-square&logo=node.js)
![Nestjs](https://img.shields.io/badge/-Nestjs-%23282C34?style=flat-square&logo=nestjs)
![Deno](https://img.shields.io/badge/-Deno-%23282C34?style=flat-square&logo=deno)
![Java](https://img.shields.io/badge/-Java-%23282C34?style=flat-square&logo=Java&logoColor=orange)
![MySQL](https://img.shields.io/badge/-MySQL-%232C3A42?style=flat-square&logo=mysql&logoColor=%23ffffff)

![Jenkins](https://img.shields.io/badge/-Jenkins-%231a202c?style=flat-square&logo=Jenkins)
![Gitlab CI](https://img.shields.io/badge/-Gitlab%20CI-%231a202c?style=flat-square&logo=gitlab)
![Docker](https://img.shields.io/badge/-Docker-%231a202c?style=flat-square&logo=Docker)
![Linux](https://img.shields.io/badge/-Linux-%231a202c?style=flat-square&logo=Linux)

![Webpack](https://img.shields.io/badge/-Webpack-%231a202c?style=flat-square&logo=Webpack)
![Discord.js](https://img.shields.io/badge/-Discord-%231a202c?style=flat-square&logo=Discord)

<div align="center">
  <img height="150" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"  />
</div>

###

<div align="center">
  <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="linkedin logo"  />
  <img src="https://img.shields.io/static/v1?message=Youtube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="youtube logo"  />
  <img src="https://img.shields.io/static/v1?message=Twitter&logo=twitter&label=&color=1DA1F2&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="twitter logo"  />
</div>

###

<div align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=yefu24324.yefu24324&"  />
</div>

###

<h1 align="center">hey there 👋</h1>

###

<h3 align="left">👩‍💻  About Me</h3>

###

<p align="left">I'm ... from ....<br><br>- 🔭 I’m working as ...<br>- 📚 I'm currently learning ...<br>- ⚡ In my free time I ...</p>

###

<h3 align="left">🛠 Language and tools</h3>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" height="40" alt="go logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" height="40" alt="rust logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain-wordmark.svg" height="40" alt="ruby logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain-wordmark.svg" height="40" alt="dot-net logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" height="40" alt="firebase logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-line-wordmark.svg" height="40" alt="amazonwebservices logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg" height="40" alt="circleci logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" height="40" alt="kubernetes logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40" alt="docker logo"  />
</div>

###

<h3 align="left">🔥   My Stats :</h3>

###

<div align="center">
  <img src="https://streak-stats.demolab.com?user=yefu24324&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph"  />
</div>

###`;
export function WorkbenchProvider(props: { children: JSX.Element }) {
  return (
    <WorkbenchContext.Provider
      value={{
        content: DEFAULT_CONTENT,
      }}
    >
      {props.children}
    </WorkbenchContext.Provider>
  );
}

export function useWorkbenchContext() {
  return useContext(WorkbenchContext);
}
