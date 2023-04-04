
   


    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const currentTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id || 0 },
          func: () => {
            document.addEventListener("mouseup", function() {
            // Récupérer l'objet de sélection
            const selection: Selection | null = window.getSelection();
      
            // Vérifier que le texte est sélectionné
            if (selection !== null && selection.toString().length > 0) {
            // Récupérer le texte sélectionné
            const selectedText: string = selection.toString();
            // console.log("Le texte sélectionné est : " + selectedText);
            const tooltip = document.createElement("div");
            tooltip.innerHTML = "Vous avez sélectionné : " + selectedText;
            tooltip.style.position = "absolute";
            tooltip.style.top = selection.getRangeAt(0).getBoundingClientRect().bottom + "px";
            tooltip.style.left = selection.getRangeAt(0).getBoundingClientRect().left + "px";
            tooltip.style.backgroundColor = "lightblue";
            tooltip.style.padding = "5px";
            tooltip.style.borderRadius = "5px";
            document.body.appendChild(tooltip);
            }

            });
            
            
          }
        }
      );
    });
export {}