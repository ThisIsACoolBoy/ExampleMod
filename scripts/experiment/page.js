Events.on(ClientLoadEvent, () => { //thx Qmel
    try {
      const rtfm = require("rtfm/library");

      rtfm.addSection("$block.title", {});
      rtfm.addSection("$unit.title", {});
      rtfm.addSection("$item.title", {});
      rtfm.addSection("$liquid.title", {});
      rtfm.addSection("$sector.title", {});
      rtfm.addSection("$planet.title", {});
      rtfm.addSection("$weather.title", {});
      rtfm.addSection("$block.mod.title", {});

      rtfm.addPage(Blocks.router.localizedName, [
          "random go brr",
          () => new Label(prov(() => Mathf.random(0, 10) + ""))
      ], rtfm.pages["$block.mod.title"]);//thx ilya

      const blockArr = Vars.content.blocks().toArray();
      const unitArr = Vars.content.units().toArray();
      const itemArr = Vars.content.items().toArray();
      const liquidArr = Vars.content.liquids().toArray();
      const sectorArr = Vars.content.sectors().toArray();
      const planetArr = Vars.content.planets().toArray();
      const weatherArr = Vars.content.getBy(ContentType.weather).toArray();

      const scanPage = function(objArr, bundleName){
          const vanilaSection = rtfm.addSection("$vanila.title", {}, rtfm.pages["$"+bundleName+".title"]);
          var once = false;

          for(var selectedContent of objArr){ //thx sk
              try{
                  var isMod = false;
                  var front = selectedContent;
                  if(front == null) break;
                  var str = "~";
                  var arr = Object.keys(front);
                  arr.sort();

                  if(selectedContent.minfo.mod != null){
                      isMod = true;
                      if(contentOwner != selectedContent.minfo.mod.meta.displayName) once = false;
                      if(!once){
                          var contentOwner = selectedContent.minfo.mod.meta.displayName;
                          var modSection = rtfm.addSection(selectedContent.minfo.mod.meta.displayName, {}, rtfm.pages["$"+bundleName+".title"]);
                          once = true;
                      }
                  }

                  for(var i=0; i<arr.length; i++){
                      if(arr[i] === "") continue;
                      try{
                          if((typeof front[arr[i]]) === "function") continue;
                          str += arr[i];
                          str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

                          if(i < arr.length - 1) str += "\n~";
                      }catch(ignored){}
                  }

                  if(isMod && selectedContent.minfo.mod != null){
                      rtfm.addPage(selectedContent.localizedName, [
                          (objArr == weatherArr) ? "" : "~{" + ((objArr == itemArr) ? selectedContent.minfo.mod.meta.name + "-item-" : ((objArr == liquidArr) ? selectedContent.minfo.mod.meta.name + "-liquid-" : ((objArr == sectorArr) ? selectedContent.minfo.mod.meta.name + "-zone-" : ((objArr == planetArr) ? "-planet-" : "")))) + selectedContent.name + "}",
                          "#"+selectedContent.localizedName,
                          "",
                          str
                      ], modSection);
                  }else{
           	          rtfm.addPage(selectedContent.localizedName, [
                          (objArr == weatherArr) ? "" : "~{" + ((objArr == itemArr) ? "item-" : ((objArr == liquidArr) ? "liquid-" : ((objArr == sectorArr) ? "testmod-zone-" : ((objArr == planetArr) ? "testmod-planet-" : "")))) + selectedContent.name + "}",
                          "# "+selectedContent.localizedName,
                          "",
                          str
                      ], vanilaSection);
                  }
              }catch(errorrrr){
                  print(errorrrr);
                  continue;
              }
          }
      }

      scanPage(blockArr, "block");
      scanPage(unitArr, "unit");
      scanPage(itemArr, "item");
      scanPage(liquidArr, "liquid");
      scanPage(planetArr, "planet");
      scanPage(sectorArr, "sector");
      scanPage(weatherArr, "weather");


    } catch (e) {
      Log.warn("Please install [#00aaff]DeltaNedas/rtfm[], [#00aaff]Deltanedas/ui-lib[] to view scan pages.");
      print(e);
      print(e.trace);
    }

});
