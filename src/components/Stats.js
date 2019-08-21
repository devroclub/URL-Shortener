import React from 'react';
import StatsController from "../controllers/StatsController";
import Home from "./Home";

export default class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: null,
            recent: null,
            show: "recent"
        };

        StatsController.recent().then((response) => {
            this.setState({recent: response.data});
        });

        StatsController.mostClicked().then((response) => {
            this.setState({clicks: response.data});
        });
    }

    render() {
        return (
            <div className="Stats container">
                <h2>Our statistics are open to everyone. Every click and every link →</h2>
                <button type="button" onClick={() => {
                    this.btnClick()
                }}
                        className="btn btn-sm btn-custom">{this.state.show === "clicks" ? "Most Clicked" : "Most Recent"}</button>

                <div className="col-sm-12 col-md-10 offset-md-1">
                    <table className="table table-borderless text-left table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Links</th>
                            <th scope="col">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.show === "recent" && this.state.recent && this.state.recent.map((c, i) =>
                            <tr key={i}>
                                <td className="source">{c.url}</td>
                                <td>
                                    <a target="_blank" className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a>
                                    &nbsp;&nbsp;
                                    <svg onClick={() => {Home.copyURL(c.hash)}} width="14px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy"
                                         className="svg-inline--fa fa-copy fa-w-14" role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                                    </svg>
                                </td>
                                <td>{c.count}</td>
                            </tr>
                        )}

                        {this.state.show === "clicks" && this.state.clicks && this.state.clicks.map((c, i) =>
                            <tr key={i}>
                                <td className="source">{c.url}</td>
                                <td>
                                    <a target="_blank" className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a>
                                    &nbsp;&nbsp;
                                    <svg onClick={() => {Home.copyURL(c.hash)}} width="14px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy"
                                         className="svg-inline--fa fa-copy fa-w-14" role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                                    </svg>
                                </td>
                                <td>{c.count}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    btnClick = () => {
        if (this.state.show === "recent") {
            this.setState({show: "clicks"});
        } else {
            this.setState({show: "recent"});
        }
    };

}