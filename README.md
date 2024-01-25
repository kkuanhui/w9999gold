# w9999gold.com

This is is README of this project.

## note

In this project frontend and backend are put all together.
Everything in folder `src/` are sorce code of react-app, wharae every files in root directory are backend part.
The frontend part needed to be built before deploy.
Backend part will start a nginx engine in charge of responding and receving http request.
Backend will only respond built frontend in folder `build/`.
To use node package like this way. 
We can serve both frontend and backend on the same server.


selection 
一樣使用滑鼠位置引導方格大小變化，利用 absolute positioned element 的 top left right bottom 來作定位。
不過，選擇框的四個點位會因為滑鼠位置變換而需要重新定義，或者說右下角的點會因為滑鼠位置不同而變成左上角，這樣一來四點需要做什麼處理？