javascript:(
	function() {
		var defColor="AAAB8A";/*"354011";*/
		var targetBgCol=defColor;
		var targetBgRed = targetBgCol.substr(0,2),
			targetBgGreen = targetBgCol.substr(2,2),
			targetBgBlue = targetBgCol.substr(4,2);
		
		targetBgRed = parseInt(targetBgRed, 16);
		targetBgGreen = parseInt(targetBgGreen, 16);
		targetBgBlue = parseInt(targetBgBlue, 16);
		
		var closeness = 0.8, apart = 1-closeness;

		function getCloserTo(initVal, targetVal) {
			return parseInt(initVal*apart + targetVal*closeness);
		}

		/* HSL & RGB in 0..1 range*/
		function HSLtoRGB(HSLColor) {
			with(Math) {
				var H = HSLColor[0], S = HSLColor[1], L = HSLColor[2];
				var R,G,B;

				if(S==0) {
					R=G=B = L;
					return [R,G,B];
				}

				var i, result=[0,0,0],
					temp2 = ((L<0.5) ? (L * (1 + S)) : (L+S - L*S)),
					temp1 = 2*L - temp2,
					t2_t1x6 = 6 * (temp2 - temp1),
					temp3 = [H+1/3, H, H-1/3];

				for(i=0; i<temp3.length; i++) {
					if(temp3[i] < 0)
						temp3[i] += 1;
					else if(temp3[i] > 1)
						temp3[i] -= 1;

					if(6*temp3[i] < 1)
						result[i] = temp1 + t2_t1x6*temp3[i];
					else if(2*temp3[i] < 1)
						result[i] = temp2;
					else if(3*temp3[i] < 2)
						result[i] = temp1 + t2_t1x6*(2/3-temp3[i]);
					else result[i] = temp1;
				}
			return result;
			}
		}

		/* HSL & RGB in 0..1 range*/
		function RGBtoHSL(RGBColor) {
			with(Math) {
				var R,G,B;
				var cMax,cMin;
				var sum,diff;
				var Rdelta,Gdelta,Bdelta;
				var H,L,S;

				R=RGBColor[0]; G=RGBColor[1]; B=RGBColor[2];
				cMax=max(max(R,G),B); cMin=min(min(R,G),B);
				sum=cMax+cMin; diff=cMax-cMin; L=sum/2;

				if(cMax==cMin) {
					S=0;H=0;
				} else {
					if(L<=(1/2))
						S=diff/sum;
					else
						S=diff/(2-sum);

					Rdelta=R/6/diff; Gdelta=G/6/diff; Bdelta=B/6/diff;
					if(R==cMax)
						H=Gdelta-Bdelta;
					else if(G==cMax)
						H=(1/3)+Bdelta-Rdelta;
					else
						H=(2/3)+Rdelta-Gdelta;

					if(H<0)
						H+=1;
					if(H>1)
						H-=1;
				}

				return[H,S,L];
			}
		}

		function getRGBColor(node, prop, normalized) {
			var rgb = getComputedStyle(node,null).getPropertyValue(prop);
			var r,g,b;

			if(/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb)) {
				r=parseInt(RegExp.$1,10); g=parseInt(RegExp.$2,10); b=parseInt(RegExp.$3,10);
				if(null==normalized || normalized==true)
					return[r/255,g/255,b/255];
				return [r,g,b];
			}

			return rgb;
		}

		function hslToCSS(hsl) {
			return "hsl("+Math.round(hsl[0]*360)+", "+Math.round(hsl[1]*100)+"%, "+Math.round(hsl[2]*100)+"%)";
		}

		var props=["background-color","border-left-color","border-right-color","border-top-color","border-bottom-color"];
		var props2=["backgroundColor","borderLeftColor","borderRightColor","borderTopColor","borderBottomColor"];
		var targetBgAsHSL = RGBtoHSL([targetBgRed/255, targetBgGreen/255, targetBgBlue/255]);
		var targetBgWithInvertedLuminance = HSLtoRGB([targetBgAsHSL[0], targetBgAsHSL[1], 1 - targetBgAsHSL[2]]);
		var targetFgRed = Math.round(255*targetBgWithInvertedLuminance[0]),
			targetFgGreen = Math.round(255*targetBgWithInvertedLuminance[1]),
			targetFgBlue = Math.round(255*targetBgWithInvertedLuminance[2]);
		/*
		var targetFgRed = 255-targetBgRed,
			targetFgGreen = 255-targetBgGreen,
			targetFgBlue = 255-targetBgBlue;
		alert("targetBgRed = "+targetBgRed.toString(16)+"\ntargetBgGreen = "+targetBgGreen.toString(16)+"\ntargetBgBlue = "+targetBgBlue.toString(16)+"\n\ntargetFgRed = "+targetFgRed.toString(16)+"\ntargetFgGreen = "+targetFgGreen.toString(16)+"\ntargetFgBlue = "+targetFgBlue.toString(16));
		*/

		function shiftColors(elem) {
			var i;
			if(elem.nodeType==Node.ELEMENT_NODE) {
				for(i=0; i<elem.childNodes.length; ++i)
					shiftColors(elem.childNodes[i]);

				var hsl, resultCol, initCol = getRGBColor(elem, "color", false);

				if(typeof initCol=="string")
					initCol = /*[targetFgRed,targetFgGreen,targetFgBlue];*/ /**/[0,0,0];/**/

				resultCol = [getCloserTo(initCol[0], targetFgRed)/255, getCloserTo(initCol[1], targetFgGreen)/255, getCloserTo(initCol[2], targetFgBlue)/255];
				hsl = RGBtoHSL(resultCol);

				elem.style["color"] = hslToCSS(hsl);

				for(j=0; j<props.length; j++) {
					initCol = getRGBColor(elem, props[j], false);
					if(typeof initCol=="string")
						initCol = /*[targetBgRed,targetBgGreen,targetBgBlue];*/ /**/[255,255,255];/**/

					resultCol = [getCloserTo(initCol[0], targetBgRed)/255, getCloserTo(initCol[1], targetBgGreen)/255, getCloserTo(initCol[2], targetBgBlue)/255];
					hsl = RGBtoHSL(resultCol);
					elem.style[props2[j]] = hslToCSS(hsl);
				}
			}
		}

		shiftColors(document.documentElement);
	}
)()