
   


    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const currentTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id || 0 },
          func: () => {
            document.addEventListener("mouseup", function(e) {
            // Récupérer l'objet de sélection
            const selection: Selection | null = window.getSelection();
            var tooltip = document.createElement("div");
            let X: number = 0
            let Y: number = 0
            // Vérifier que le texte est sélectionné
            if (selection !== null && selection.toString().length > 0) {
            // Récupérer le texte sélectionné
            const selectedText: string = selection.toString();
            // console.log("Le texte sélectionné est : " + selectedText);
             fetch(`https://api.mymemory.translated.net/get?q=${selectedText}!&langpair=en|fr`)
            .then(res => res.json())
            .then(data => {
              console.log(data.responseData.translatedText)
              X = e.clientX + window.pageXOffset
              Y = e.clientY + window.pageYOffset
              tooltip.classList.add("tooltip"); 
              tooltip.innerHTML = data.responseData.translatedText;
              tooltip.style.position = "absolute";
              tooltip.style.top = Y + "px";
              tooltip.style.left = X + "px";
              tooltip.style.backgroundColor = "lightblue";
              tooltip.style.padding = "5px";
              tooltip.style.borderRadius = "5px";
              document.body.appendChild(tooltip);
              document.addEventListener("mousedown", function(e) {
              const tooltip = document.querySelector(".tooltip");
              if (tooltip !== null) {
                tooltip.remove();
              }
            });
            })
            


            }
            
            });
            
            
          }
        }
      );
    });



// export async function translate() {
//       const response = await fetch(`https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|fr`).then(res => {
//         console.log(res)
//       })

//       return response
//   }

export{}