// 根据id打字

const type = {
    _typeByIdItem : {
        
    },
    typeById(id, str, time) {
        if(time==null||time==undefined){
            time = 100;
        }
        if(id==null||id==undefined){
            return;
        }
        var node = document.getElementById(id);
        if(node==null||node==undefined){
            return;
        }
        //开始打字
        var i = 0;
        var length = str.length;
        _typeByIdItem.i=i;
        _typeByIdItem.length = length;
        _typeByIdItem.nodeId = id;
        var id = setTimeout(_typeById,time);
        _typeByIdItem.id = id;
    },
    _typeById(){
        var node = document.getElementById(_typeByIdItem.nodeId);
        node.innerHTML += str.charAt(i);
        _typeByIdItem.i++;
        if(_typeByIdItem.i==_typeByIdItem.length){
            clearImmediate(_typeByIdItem.id);
        }

    }

}

export default type