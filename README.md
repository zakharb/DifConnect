<p align="center">
  <img src="img/logo.png" alt=" The Queenthine Font" />
</p>

<p align="center">

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&pause=1000&color=9D98FF&width=435&center=true&size=30&lines=+Parse+web+Site+for+data;Connect+to+Diffusion" alt="Typing SVG" />
  </a>

</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0-blue" height="20"/>
  <img src="https://img.shields.io/badge/python-3.11-blue" height="20"/>
  <img src="https://img.shields.io/badge/asyncio-3.11-blue" height="20"/>
  <img src="https://img.shields.io/badge/diffusion-6.8.7-blue" height="20"/>
</p>

## :purple_square: Getting Started

[Difconnect](https://github.com/zakharb/difconnect) is the Service that parse website for data and connect to Diffusion Server to extract data from it.  

### Requirements

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)  
`asyncio` and `diffusion` libraries are required.

### Installing

Install via `pip`
```
pip install difconnect
```
## :purple_square: Usage

Set up `config.py` file for parameters

Run service with arguments:
- `get` to get information from server

## :purple_square: Deployment

Edit Dockerfile and spicify arguments to run service

Build image
```
docker build -t difconnect .
```

Run image
```
docker run -it difconnect
```

## :purple_square: Versioning

Using [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/zakharb/difconnect/tags). 

## :purple_square: Authors

* **Zakhar Bengart** - *Initial work* - [Ze](https://github.com/zakharb)

See also the list of [contributors](https://github.com/zakharb/difconnect/contributors) who participated in this project.

## :purple_square: License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation - see the [LICENSE](LICENSE) file for details

