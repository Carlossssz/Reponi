export function toUpperCaseFirstLetter(text: string){
    const first = text.slice(0, 1).toUpperCase(); //pega a primeira letra e transforma em maiuscula.
    const rest = text.slice(1) //pega a string sem a primeira letra,

    return first + rest //justa tudo.
}