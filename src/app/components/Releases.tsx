'use client'

import { useEffect, useState } from "react"
type releasesType = [] | null | 'failed'

const extractDate = (releaseTime: string) => {
    return releaseTime.slice(0, 10)
}

const Releases = ({className} : {className: string}) => {
    const [releases, setReleases] = useState<releasesType>(null)

    useEffect(() => {
        console.log(releases)
    }, [releases])

    const getReleases = async () => {
        setReleases(null)
        fetch("https://api.github.com/repos/FilippoDude/widgetscratepub/releases")
            .then(res => res.json())
            .then(data => setReleases(data))
            .catch(err => {console.error("Error while getting release: ", err.toString()); setReleases('failed')})
    }

    useEffect(() => {
        getReleases()
    }, [])


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
            releases.map((release, i) => {
                return <div key={i} className={"flex flex-col gap-2 " + className}>
                    <div className="relative rounded-2xl w-200 h-40 bg-[#00000060] p-2">
                        <p className="font-black text-4xl absolute top-4 left-4">{release["name"]}</p>
                        <p className="font-medium text-xl absolute bottom-4 left-4">{release["body"]}</p>
                        <p className="font-bold text-xl absolute top-4 right-4">{extractDate(release["published_at"])}</p>
                        { release["assets"][0] ? 
                            
                            <a className="absolute right-4 bottom-4 bg-[#8D86C9] py-2 px-6 rounded-xl cursor-pointer mt-2" href={release["assets"][0]["browser_download_url"]}>Download</a>
                        :
                            <a className="absolute right-4 bottom-4 bg-[#8D86C9] py-2 px-6 rounded-xl cursor-pointer mt-2">No direct download</a>
                        }
                    </div>
                </div>
            })
            }
        </>
    )
}

export default Releases