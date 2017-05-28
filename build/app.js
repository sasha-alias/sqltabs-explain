var example = "Nested Loop  (cost=1.15..2.69 rows=1 width=345)\n" + "  ->  Hash Join  (cost=1.02..2.41 rows=1 width=281)\n" + "        Hash Cond: (s.usesysid = u.oid)\n" + "        ->  Function Scan on pg_stat_get_activity s  (cost=0.00..1.00 rows=100 width=217)\n" + "        ->  Hash  (cost=1.01..1.01 rows=1 width=68)\n" + "              ->  Seq Scan on pg_authid u  (cost=0.00..1.01 rows=1 width=68)\n" + "  ->  Index Scan using pg_database_oid_index on pg_database d  (cost=0.13..0.27 rows=1 width=68)\n" + "        Index Cond: (oid = s.datid)";

var App = React.createClass({

    getInitialState: function () {
        return {
            "plantext": "",
            "analytics": true
        };
    },

    changeHandler: function (event) {
        this.setState({ "plantext": event.target.value });
    },

    render: function () {

        var self = this;
        var resultset = [];
        self.state.plantext.split(/\n/).forEach(function (item) {
            item = item.replace(/^"(.*)"$/, '$1'); // remove quotes
            item = item.replace(/^'(.*)'$/, '$1'); // remove single quotes
            if (item.match(/^-*$/)) {
                return;
            } // skip line with dashes (supposedly header separator)
            if (item.match(/^\s*QUERY PLAN\s*$/)) {
                return;
            } // skip header
            resultset.push([item]);
        });
        if (resultset.length > 0) {
            var planNodes = PGPlanNodes(resultset.slice());
            var pgplan = React.createElement(PGPlan, { nodes: planNodes });
        } else {
            pgplan = null;
        }

        if (this.state.analytics) {
            console.log("analytics is on");
            var analytics_text = "<script>\n" + "  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" + "  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" + "  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" + "  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n" + "\n" + "  ga('create', 'UA-100017043-1', 'auto');\n" + "  ga('send', 'pageview');\n" + "\n" + "</script>";
            var analytics = React.createElement("div", { dangerouslySetInnerHTML: { __html: analytics_text } });
        } else {
            console.log("analytics is off");
            var analytics = null;
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "header" },
                React.createElement(
                    "a",
                    { target: "_blank", href: "http://www.sqltabs.com" },
                    React.createElement("img", { className: "logo", src: "img/logo.png" }),
                    " SQL Tabs Explain "
                )
            ),
            React.createElement("textarea", { refs: "planText", className: "plan-input-text", placeholder: example, rows: "10", onChange: self.changeHandler }),
            pgplan,
            React.createElement(
                "div",
                { className: "footer" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { target: "_blank", href: "https://github.com/sasha-alias" },
                        " Created by Sasha Aliashkevich "
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { target: "_blank", href: "https://github.com/sasha-alias/sqltabs-explain" },
                        " Github "
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { target: "_blank", href: "https://github.com/sasha-alias/sqltabs-explain/blob/master/LICENSE" },
                        " MIT License "
                    )
                )
            ),
            analytics
        );
    }
});

var app = React.createElement(App, null);
var mountNode = document.getElementById('root');

ReactDOM.render(app, mountNode);