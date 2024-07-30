import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";


function Recaptcha () {

    const key = "6LduYponAAAAAIw_j4mvrGPn8dR0KkPyTmHNoJce"

    const [captchaIsDone, setCaptchaDone] = useState(false)


    function onChange() {
        console.log("Changed")
        setCaptchaDone(true)
    }

    return (
        <>
            <ReCAPTCHA
                sitekey= {key}
                onChange={onChange}
            />
        </>

    )
}

export default Recaptcha