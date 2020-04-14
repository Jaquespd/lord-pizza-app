export default function whatsappApi(delivery, cart) {
  const {
    name,
    phone,
    street,
    number,
    bairro,
    complement,
    reference,
    observer
  } = delivery;

  const templateMsg = `Ola meu nome é ${name} e gostaria de pedir: 
  ${cart.map(c => `\n${c.amount} x ${c.title}`)}
  
  Observações:
  ${observer}
    
  O endereço de entrega é na:
  ${street}, numero ${number}, bairro ${bairro},
  ${complement},
  ${reference}.
    
  Meu numero de contato é o ${phone}`;

  const encodeMessage = window.encodeURIComponent(templateMsg);

  const urlApiWhatsapp = `${"https://api.whatsapp.com/send?phone=" +
    "5584996522011" +
    "&text="}${encodeMessage}`;

  return urlApiWhatsapp;
}
