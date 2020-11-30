var map;
var icon_add = {
        url: 'danger.png',
        size: new google.maps.Size(40, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 50),
        scaledSize: new google.maps.Size(40, 50)
      };
var marker = new google.maps.Marker({icon:icon_add});//marker作成
var directionsDisplay= new google.maps.DirectionsRenderer({
  draggable:true
});
var directionsService = new google.maps.DirectionsService();
directionsDisplay.setPanel(document.getElementById("panel"));
    // #map_canva要素にMapクラスの新しいインスタンスを作成
function maps() {
  navigator.geolocation.watchPosition(success, error);
  function success(position) {
    var latitude  = position.coords.latitude;//緯度
    var longitude = position.coords.longitude;//経度
    // Mapクラスのインスタンスを作成（緯度経度は現在地に設定）

      var icon = {
              url: 'icon.png',
              size: new google.maps.Size(40, 50),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(20, 50),
            scaledSize: new google.maps.Size(40, 50)
            };
  var initPos = new google.maps.LatLng(latitude, longitude);


  var myOptions = {
    zoom: 16,
    center: initPos,
  };
map = new google.maps.Map(document.getElementById('map-canvas'),myOptions);

new google.maps.Marker( {
    map: map ,
    icon:icon ,
    position: initPos ,
} ) ;
      //GeoJSONデータ読み込み
      d3.json('避難所.geojson', geo);//神奈川県の避難所データ
      //d3.json('山王川.geojson', geo);
      //d3.json('狩川.geojson', geo);
      //d3.json('大岡川.geojson', geo);
      //d3.json('相模川.geojson',geo);
      //d3.json('土砂災害.geojson', geo);//相模川のハザードマップ
      google.maps.event.addListener(map, 'click', mylistener);
    }//success
    function error(position){
       return 0;
    }



}//maps

function geo(data) { //避難所にマーカーを設置
    //データレイヤーに追加
    map.data.addGeoJson(data);
map.data.setStyle(function(feature) {

var myStyle = {
  fillColor: "#9AD2AE",//塗り潰しの色
  fillOpacity: 0.5,//ポリゴンの透明度
  strokeColor: "#1EB26A",//線の色
  strokeOpacity: 0.8,//線の透明度
  strokeWeight: 1,//線の幅
  clickable: true,
  visible: true,
  zIndex: 1
};

return (myStyle);
});
    //イベント(マーカークリック時)を設定
    map.data.addListener('click', mouseClick);
}

function mouseClick(e) {
    //クリック時に避難所情報を表示する
    var hinan=window.confirm("この施設までの経路を表示しますか？"+"\n\n"+"施設名:"+e.feature.getProperty('指定緊急避難場所')+"\n"+"住所:"+e.feature.getProperty('所在地')+"\n"+"洪水:"+e.feature.getProperty('洪水')+"\n"+"がけ崩れ、土石流及び地滑り:"+e.feature.getProperty('がけ崩れ、土石流及び地滑り')+"\n"+"高潮:"+e.feature.getProperty('高潮')+"\n"+"地震:"+e.feature.getProperty('地震')+"\n"+"津波:"+e.feature.getProperty('津波')+"\n"+"大規模な火事:"+e.feature.getProperty('大規模な火事')+"\n"+"内水氾濫:"+e.feature.getProperty('内水氾濫')+"\n"+"火山現象:"+e.feature.getProperty('火山現象'));
    if(hinan){
      document.getElementById( "mapSearch" ).value = e.feature.getProperty('指定緊急避難場所');
    }else{
      return 0;
    }
}

function route() {
  navigator.geolocation.watchPosition(success2);
  function success2(position) {
    var latitude2  = position.coords.latitude;//緯度
    var longitude2 = position.coords.longitude;//経度
    var initPos2 = new google.maps.LatLng(latitude2, longitude2);
  // mapの表示時の中心点を決めている(ルート案内に失敗したときのデフォルト画面)

  // mapの表示
  directionsDisplay.setMap(map);

  // directionServiceに渡す変数
  // 出発地点、目的地、移動方法等を定義する
  // 経由地を設定する場合は、waypointsを追加する
  var request = {
      origin: initPos2,
      destination: maptext,
      travelMode: google.maps.TravelMode.WALKING
  };

  directionsService.route(request, function(result, status2) {
      if (status2 == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
  });
}
    var geocoder = new google.maps.Geocoder();
    var maptext  =  document.getElementById("mapSearch").value;
    geocoder.geocode(
      { address: maptext },
      function( results, status )
      {
          if( status == google.maps.GeocoderStatus.OK )
          {
              return 0;
          }
      } );
}

function mylistener(event){

        var result=window.confirm('この位置にマーカーを設置してもよろしいですか？');
        if(result){//OKを押されたとき
        //markerの位置を設定
        //event.latLng.lat()でクリックしたところの緯度を取得
        marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
        //marker設置
        marker.setMap(map);
      }else{//キャンセルを押されたとき
        return 0;
      }
      marker.addListener('click', function(){
        var result2=window.confirm('このマーカーを削除してもよろしいですか？');
        if(result2){
          marker.setMap(null);
        }else{
          return 0;
        }
      });
}
      function dosha(){
        alert("a");
      }
google.maps.event.addDomListener(window, 'load', maps);
