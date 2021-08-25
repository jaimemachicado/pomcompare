import XMLParser from 'react-xml-parser';

const diffProccess = (dependenciasDirectasFichero1, dependenciasDirectasFichero2) => {
    let mapaDependencias1 = createDependenciesMap(dependenciasDirectasFichero1);
    let mapaDependencias2 = createDependenciesMap(dependenciasDirectasFichero2);

    let depsNames1 = Object.keys(mapaDependencias1);
    let depsNames2 = Object.keys(mapaDependencias2);

    let resultados = {
    comunes : [],
        diferencias : [],
        soloEnFichero1: [],
        soloEnFichero2: []
    };

    depsNames1.filter(x => -1 !== depsNames2.indexOf(x)).forEach(dep => {
        if(mapaDependencias1[dep] === mapaDependencias2[dep]){
            resultados.comunes.push({
                dependencia: dep,
                fichero_1: mapaDependencias1[dep],
                fichero_2: mapaDependencias2[dep]
            });
        }
    });

    depsNames1.filter(x => -1 !== depsNames2.indexOf(x)).forEach(dep => {
        if(mapaDependencias1[dep] !== mapaDependencias2[dep]){
            resultados.diferencias.push({
                dependencia: dep,
                fichero_1: mapaDependencias1[dep],
                fichero_2: mapaDependencias2[dep]
            });
        }
    });

    depsNames1.filter(x => -1 === depsNames2.indexOf(x)).forEach(dep => {
        resultados.soloEnFichero1.push({
            dependencia: dep,
            fichero_1: mapaDependencias1[dep],
            fichero_2: ' ----- '
        });
    });

    depsNames2.filter(x => -1 === depsNames1.indexOf(x)).forEach(dep => {
        resultados.soloEnFichero2.push({
            dependencia: dep,
            fichero_1: ' ----- ',
            fichero_2: mapaDependencias2[dep]
        });
    });

    return resultados;
};

const createDependenciesMap = (listaDependencias) => {
    let mapDependencias = {};

    for(let dependencia of listaDependencias){
        let groupId = dependencia.children[0].value;
        let artifactId = dependencia.children[1].value;
        let version = dependencia.children[2].value;
        if(version){
            mapDependencias[groupId + "-%%%-" + artifactId] = version;
        }
    }
    return mapDependencias;
};

export function  dependenciesDiff(pomViejo, pomNuevo) {
    let dependenciasDirectasFichero1 = new XMLParser().parseFromString(pomViejo).getElementsByTagName('dependency') || [];
  
    console.log("Dependencias Directas Fichero 1: ", dependenciasDirectasFichero1);
  
    let dependenciasDirectasFichero2 = new XMLParser().parseFromString(pomNuevo).getElementsByTagName('dependency') || [];
    console.log("Dependencias Directas Fichero 2: ", dependenciasDirectasFichero1);
    
    return diffProccess(dependenciasDirectasFichero1,dependenciasDirectasFichero2);
  };