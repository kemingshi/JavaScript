/**
 * @param {number[]} deliciousness
 * @return {number}
 */


function click_1711(e){
    var deliciousness = [1,3,5,7,9];

    var iLength = deliciousness.length;
    var iSum = 0;
    var iResult = 0;
    var iCount1 = 0;
    var sResult = "";
    for(var i=0; i<iLength; i++){
        for(var j=i+1; j<iLength; j++){

            iSum = deliciousness[i] + deliciousness[j];
            var sSum = iSum.toString(2);
            iCount1 = 0;
            for (var num of sSum) {
                if( num === "1"){
                    iCount1 = iCount1 + 1;
                }
            }
            if( iCount1 === 1 ){
                sResult = sResult + "(" + deliciousness[i] + "," + deliciousness[j] + "),";
                iResult = iResult + 1;
            }
        }
    }
    return iResult;


}
