var xmlHttp= createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
    var xmlHttp;


    if(window.ActiveXObject){
        try{
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){
            xmlHttp = false;
    }


    } else {
        try{
            xmlHttp = new XMLHttpRequest();
        }catch(e){
            xmlHttp = false;
        }
    }

    if(!xmlHttp){
        alert("cant create object");
    }else{
        return xmlHttp;
    }
}

function process(i){
    var x = xmlHttp.readyState
    if(xmlHttp.readyState==0||xmlHttp.readyState==4){

        nomBio = encodeURIComponent(document.getElementById("userInput").value)
        xmlHttp.open("GET","http://infosaludapp.cl/scrapping/?med=" + nomBio , true);
        x=xmlHttp.readyState;
        xmlHttp.onreadystatechange= handleServerResponse;
        xmlHttp.send(null);

    }else{
        setTimeout('process()',1000);
    }   
 }


function handleServerResponse(){

    if(xmlHttp.readyState==4){
        if(xmlHttp.status==200){

        var xmlResponse= xmlHttp.responseXML;
            xmlDocumentElement = xmlResponse.documentElement;
            message = xmlDocumentElement.firstChild.data;
            Finalmessage = message;

            document.getElementById("results").innerHTML= '<span style="font-size:0.9em;">' + Finalmessage + '</span>';
            setTimeout('process()', 1000);
        }else{
            alert('Intente de nuevo o llame a su oficina local!');
        }
    }
}