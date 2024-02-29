const sayiInput = document.querySelector(".sayiInput");
const gonderBtn = document.querySelector(".gonderBtn");
const sayiListeUl = document.querySelector(".sayiListeUl");

// Local Storage'dan sayıları yükleme
document.addEventListener("DOMContentLoaded", sayilariYukle);

gonderBtn.addEventListener("click", terseCevir);
sayiListeUl.addEventListener("click", deleteHandle);

function sayilariYukle() {
  let sayilar = JSON.parse(localStorage.getItem("sayilar"));
  if (sayilar) {
    sayilar.forEach(function(sayi) {
      sayiEkle(sayi);
    });
  }
}

function terseCevir(e) {
  e.preventDefault();
  if (sayiInput.value.trim() !== "" && sayiInput.value.trim() > 0) {
    let cevrildi = parseInt(sayiInput.value.toString().split("").reverse().join(''));
    sayiEkle(cevrildi);
    sayiInput.value = "";
    
    // Sayıyı Local Storage'a ekliyorum burada. 
    sayilariKaydet(cevrildi);
  } else {
    alert("Geçersiz bir değer giriyorsun, tekrar dene!");
  }
}

function sayiEkle(cevrildi) {
  const sayilarLiDiv = document.createElement("div");
  sayilarLiDiv.classList.add("sayilarLiDiv");
  sayiListeUl.appendChild(sayilarLiDiv);

  const tersSayiLi = document.createElement("li");
  tersSayiLi.classList.add("terssayiLi");
  tersSayiLi.innerHTML = cevrildi;
  sayilarLiDiv.appendChild(tersSayiLi);
  
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
  sayilarLiDiv.appendChild(trashButton);
}

function sayilariKaydet(sayi) {
  let sayilar = JSON.parse(localStorage.getItem("sayilar")) || [];
  sayilar.push(sayi);
  localStorage.setItem("sayilar", JSON.stringify(sayilar));
}

function deleteHandle(e) {
  const ulItem = e.target;
  if (ulItem.classList.contains("trash-btn")) {
    const silinecekElement = ulItem.parentElement;

    silinecekElement.classList.add("fall");
    silinecekElement.addEventListener("transitionend", function() {
      silinecekElement.remove();
      // Elementi Local Storage'dan silmek icin yaziyorum buarada. direk local storageden,
      sayiyiSil(silinecekElement.innerText);
    });
  }
}
//sonra local storaden silmek icin kod bunu cagiriyorum.
function sayiyiSil(silinecekSayi) {
    silinecekSayi = parseInt(silinecekSayi);
  let sayilar = JSON.parse(localStorage.getItem('sayilar')) || [];

    const yeniSayilar = sayilar.filter(sayi => sayi !== silinecekSayi);

    localStorage.setItem('sayilar', JSON.stringify(yeniSayilar));
}