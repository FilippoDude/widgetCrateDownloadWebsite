'use client'

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

type releasesType = [] | null | 'failed'
const extractDate = (releaseTime: string) => {
    return releaseTime.slice(0, 10)
}

const Releases = ({className} : {className: string}) => {
    const [releases, setReleases] = useState<releasesType>(null)
    const releasesElsRef = useRef<HTMLDivElement[]>([]) 
    useEffect(() => {
        if(releasesElsRef.current){
            for(let i = 0; i<releasesElsRef.current.length; i++){
                gsap.fromTo(releasesElsRef.current[i], {
                    translateX: i%2 == 1 ? 100 : -100,
                    opacity: 0,
                    duration: 1,
                    delay: i * 0.5
                },{
                    translateX: 0,
                    opacity: 1
                })
            }
        }
    }, [releases])

    const getReleases = async () => {
        setReleases(null)
        releasesElsRef.current = []
        fetch("https://api.github.com/repos/FilippoDude/widgetscratepub/releases")
            .then(res => res.json())
            .then(data => setReleases(data))
            .catch(err => {console.error("Error while getting release: ", err.toString()); setReleases('failed')})
    }

    useEffect(() => {
        getReleases()
    }, [])

    const addReleaseElRef = (ref: HTMLDivElement | null) => {
        if(ref != null){
            releasesElsRef.current.push(ref)
        }
    }

    return(
        <>  
            { releases == null ?
                <div className={"relative flex items-center justify-center" + className}>
                    <p className="font-black text-4xl">Loading...</p>
                </div>
            : releases == 'failed' ?  
               <div className={"relative flex flex-row items-center justify-center gap-2 " + className}>
                    <p className="relative font-black text-4xl">Failed to fetch releases.</p>
                    <button onClick={getReleases} className="relative cursor-pointer font-bold underline-offset-5 underline text-4xl">Retry?</button>
                </div>
            :
            <div className={"relative flex flex-col gap-2 h-fit " + className}>
                {releases.map((release, i) => {
                    return <div key={i} ref={ref => addReleaseElRef(ref)} className="relative rounded-2xl w-full sm:w-200 min-h-40 bg-[#00000060] backdrop-blur-xl flex flex-col justify-around">
                            <div className="relative w-full flex flex-row justify-between px-4 flex-wrap gap-x-6 gap-y-2 pt-4">
                                <p className="font-black text-4xl">{release["name"]}</p>
                                <p className="font-bold text-xl ">{extractDate(release["published_at"])}</p>
                            </div>
                            <div className="flex flex-row relative min-w-full w-full items-end flex-wrap justify-between gap-2 px-4 pb-4 pt-4">
                                <p className="font-medium text-md min-w-40 sm:w-fit md:text-xl">{release["body"]}</p>
                                { release["assets"][0] ? 
                                    
                                    <a className="min-w-fit max-w-46 w-full text-center h-fit bg-[#8D86C9] py-2 px-6 rounded-xl cursor-pointer transition-all duration-100 hover:bg-[#242038]" href={release["assets"][0]["browser_download_url"]}>Download</a>
                                :
                                    <a className="min-w-fit h-fit max-w-46 bg-[#8D86C9] py-2 px-6 rounded-xl cursor-pointer hover:brightness-50 transition-all duration-100 text-center">No direct download</a>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
            }
        </>
    )
}

export default Releases