       
       
       function addListener(obj, type, fn){
            if(obj.addEventListener) obj.addEventListener(type,fn,false);
            else obj.attachEvent("on" + type,fn);
        } // End addListemer

        function removeListener(obj, type, fn){
            if(obj.removeListener) obj.removeListener(type,fn,false);
            else obj.detachEvent("on" + type, fn);

        }// End removeListener