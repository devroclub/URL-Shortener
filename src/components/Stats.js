import React from 'react';
import StatsController from "../controllers/StatsController";

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
                        className="btn btn-sm btn-success">{this.state.show === "recent" ? "Most Clicked" : "Most Recent"}</button>

                <div className="col-sm-12 col-md-8 offset-md-2">
                    <table className="table table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">Links</th>
                            <th scope="col">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.show === "recent" && this.state.recent && this.state.recent.map((c, i) =>
                            <tr key={i}>
                                <td><a target="_blank" className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a></td>
                                <td>{c.count}</td>
                            </tr>
                        )}

                        {this.state.show === "clicks" && this.state.clicks && this.state.clicks.map((c, i) =>
                            <tr key={i}>
                                <td><a target="_blank" className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a></td>
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