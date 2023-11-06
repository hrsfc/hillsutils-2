interface configObj {
    baseroute: string,
    timetableroute: string,

}

let config: configObj = {
    baseroute: "https://intranet.hrsfc.ac.uk/ProPortal",
    timetableroute:"/pages/ilp/prosolution/23_2/pstimetable.aspx",
    
}

export {config, type configObj}

