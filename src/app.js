var example = "Nested Loop  (cost=1.15..2.69 rows=1 width=345)\n"+
"  ->  Hash Join  (cost=1.02..2.41 rows=1 width=281)\n"+
"        Hash Cond: (s.usesysid = u.oid)\n"+
"        ->  Function Scan on pg_stat_get_activity s  (cost=0.00..1.00 rows=100 width=217)\n"+
"        ->  Hash  (cost=1.01..1.01 rows=1 width=68)\n"+
"              ->  Seq Scan on pg_authid u  (cost=0.00..1.01 rows=1 width=68)\n"+
"  ->  Index Scan using pg_database_oid_index on pg_database d  (cost=0.13..0.27 rows=1 width=68)\n"+
"        Index Cond: (oid = s.datid)";

var App = React.createClass({

    getInitialState: function(){
        return {"plantext": ""}
    },

    changeHandler: function(event){
        this.setState({"plantext": event.target.value});
    },

    render: function(){

        var self = this;
        var resultset = [];
        self.state.plantext.split(/\n/).forEach(function(item){
            item = item.replace(/^"(.*)"$/, '$1'); // remove quotes
            item = item.replace(/^'(.*)'$/, '$1'); // remove single quotes
            if (item.match(/^-*$/)){return;} // skip line with dashes (supposedly header separator)
            if (item.match(/^\s*QUERY PLAN\s*$/)){return;} // skip header
            resultset.push([item]);
        });
        if (resultset.length > 0){
            var planNodes = PGPlanNodes(resultset.slice());
            var pgplan = <PGPlan nodes={planNodes}/>
        } else {
            pgplan = null;
        }
        return <div>
                <div className="header">
                    <a target="_blank" href="http://www.sqltabs.com"><img className="logo" src="img/logo.png"/> SQL Tabs Explain </a>
                </div>
            <textarea refs="planText" className="plan-input-text" placeholder={example} rows="10" onChange={self.changeHandler}>
            </textarea>
            {pgplan}
            <div className="footer">
                <div><a target="_blank" href="https://github.com/sasha-alias"> Created by Sasha Aliashkevich </a></div>
                <div><a target="_blank" href="https://github.com/sasha-alias/sqltabs-explain"> Github </a></div>
                <div><a target="_blank" href="https://github.com/sasha-alias/sqltabs-explain/blob/master/LICENSE"> MIT License </a></div>
            </div>
        </div>
    }
});

var app = <App/>;
var mountNode = document.getElementById('root');

ReactDOM.render(app, mountNode);
