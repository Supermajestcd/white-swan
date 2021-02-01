import styled from '@emotion/styled'

export const Container = styled.div`
body {
  font-family: 'Montserrat', sans-serif;
}
h1, h2, h3, h4, h5, h6, p, span, input {
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2.5rem;
}
h3 {
 font-size: 2.2rem;
}
h4 {
 font-size: 2rem;
}
h5 {
 font-size: 1.5rem;
}
h6 {
 font-size: 1rem;
}
p {
  min-height: 1rem;
}
.link a {
  color: #99cc33;
  text-decoration: none;
  font-weight: bold;
}
.link a:hover {
  text-decoration: underline;
}
.linkButton a {
  border: 2px solid;
  padding: 6px 24px;
  border-radius: 24px;
  margin: 12px 0px;
  opacity: 0.8;
}
.linkButton a:hover {
  opacity: 1;
  color: inherit;
}
[class^="MenuOption"], [class^="LinkInput"] {
 color: black !important;
}
img {
 margin: 0 auto;
}
table {
 margin: 0 auto;
 color: #333;
 background: white;
 border: 1px solid grey;
 font-size: 12pt;
 border-collapse: collapse;
}
table thead th,
table tfoot th {
 color: #777;
 background: rgba(0,0,0,.1);
}
table caption {
 padding:.5em;
}
table th,
table td {
 padding: .5em;
 border: 1px solid lightgrey;
}
`
