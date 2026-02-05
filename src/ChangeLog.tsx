import changelog from "./changelog.json";

export function ChangeLog() {
    return <div style={{top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1000}}>
        {Object.keys(changelog).reverse().map((version, index) => {
            const log = changelog[version];
            return <div key={index}>
                <h3>{version} - {log.date}</h3>
                <ul>
                    {log.changes.map((change, index) => <li key={index}>{change}</li>)}
                </ul>
            </div>
        })
        }
    </div>
}