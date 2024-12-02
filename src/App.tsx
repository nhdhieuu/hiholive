import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "@/components/ui/button.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Button>Hello World!</Button>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </>

    )
}

export default App
