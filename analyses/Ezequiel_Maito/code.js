  multi_chart([["data.csv",["RoPM"]]],function(data){ndata = {};ndata.RoPM = data.RoPM/2;ndata.year=data.year; return ndata;},"#chart","%");
