


export default function Welcome({name, message}){
    return(
        <p>{`Hi ${name}, ${message}`}</p>
    )
}


export function Button({title, color, size}){
    return(
        <button style={{color: color, width: '2rem', height: size}}>{title}</button>
    )
}

