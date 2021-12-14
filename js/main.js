let global = {};
function createStartForm(students) {
    const form = document.createElement("form");
    form.id = "startForm";
    const input = document.createElement("input");
    input.type = "number";
    input.id = "startFormInput";
    input.placeholder = "Ilość uczniów";
    input.autofocus = true;
    if (students) {
        input.value = students;
        document.body.insertAdjacentElement("beforeend", createNote());
    }
    form.insertAdjacentElement("beforeend", input);
    const one = document.createElement("input");
    one.type = "submit";
    one.id = "startFormSubmit";
    one.value = "Losuj pojedynczego ucznia";
    form.insertAdjacentElement("beforeend", one);
    const many = document.createElement("input");
    many.type = "submit";
    many.id = "startFormSubmit";
    many.value = "Losuj wszystkich uczniów";
    form.insertAdjacentElement("beforeend", many);
    one.onclick = event => {
        event.preventDefault();
        if (input.value) {
            global.students = Number(input.value);
            // document.getElementById("startForm").remove();
            document.body.innerHTML = "";
            document.body.insertAdjacentElement("beforeend", createContainer(global.students));
            generateOne();
        }
    }
    many.onclick = event => {
        event.preventDefault();
        if (input.value) {
            global.students = Number(input.value);
            // document.getElementById("startForm").remove();
            document.body.innerHTML = "";
            document.body.insertAdjacentElement("beforeend", createContainer(global.students));
            generateMany();
        }
    }
    return form;
}
function generateOne() {
    const random = Math.floor(Math.random() * global.students);
    const element = document.createElement("div");
    element.id = "student";
    element.innerHTML = random + 1;
    document.getElementById("container").insertAdjacentElement("beforeend", element);
}
function generateMany() {
    const numbers = [];
    let i = 1;
    do {
        const random = Math.floor(Math.random() * global.students) + 1;
        if (!numbers.includes(random)) {
            numbers.push(random);
            document.getElementById("container").insertAdjacentElement("beforeend", generateNumberElement(i, random));
            i++;
        }
    } while (numbers.length !== global.students);
}
function generateNumberElement(index, value) {
    const numberElement = document.createElement("div");
    numberElement.classList.add("numberElement");
    numberElement.innerHTML = `<b>${index}.</b> ${value}`;
    numberElement.classList.add("b");
    numberElement.onclick = event => numberElement.classList.contains("b") ? numberElement.classList.replace("b", "a") : numberElement.classList.replace("a", "b");
    return numberElement;
}
function createContainer(students) {
    const container = document.createElement("div");
    container.id = "container";
    container.insertAdjacentElement("beforeend", createStartForm(students));
    return container;
}
function createNote() {
    const note = document.createElement("div");
    note.id = "note";
    note.innerHTML = "Aby zaznaczyć, że dany uczeń rozwiązał zadanie kliknij na pole z jego numerem.";
    return note;
}
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        document.body.insertAdjacentElement("beforeend", createContainer());
        document.body.insertAdjacentElement("beforeend", createNote());
    }
}