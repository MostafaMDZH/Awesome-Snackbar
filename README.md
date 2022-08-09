# Typescript Components
A collection of reusable Typescript components for web development.<br>
@MostafaMDZH | mostafa.mdzh@gmail.com</br>

</br>

# • Snackbar

<b>Features:</b>
<ul>
    <li>Custom text and callback on action button</li>
    <li>Waiting for user event on page to hide</li>
    <li>Ability to disabling the auto hide</li>
    <li>Asynchronous Objects</li>
    <li>Dynamic HTML</li>
    <li>Responsive design</li>
</ul>

<b>Usage: <a href="https://typescript-components.demos.mostafa-mdzh.ir/snackbar">[demo]</a></b>
> new Snackbar({</br>
>&nbsp;&nbsp;&nbsp;&nbsp;message: 'This is a Snackbar!',</br>
>&nbsp;&nbsp;&nbsp;&nbsp;actionText: 'Action',</br>
>&nbsp;&nbsp;&nbsp;&nbsp;onAction: () => {</br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alert('Action Called!');</br>
>&nbsp;&nbsp;&nbsp;&nbsp;},</br>
>&nbsp;&nbsp;&nbsp;&nbsp;hidingTimeout: 4000</br>
>});</br>