export default function (elem: string) {
    const iframe = document.createElement('iframe'); // create the element
    document.body.appendChild(iframe); // insert the element to the DOM
    document.body.style.overflow = 'hidden'; // removing sidescroll on the page while calling it

    iframe.contentWindow?.document.write(elem); // write the HTML to be printed
    iframe.contentWindow?.print(); // print it
    document.body.removeChild(iframe); // remove the iframe from the DOM
    document.body.style.overflow = 'initial'; // getting overflow back when closing printing window
}
