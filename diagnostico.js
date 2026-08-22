const steps=[
 {key:"nome",kicker:"É um prazer receber você.",title:"Como devemos te chamar?",label:"NOME E SOBRENOME",type:"text",placeholder:"Digite seu nome e sobrenome"},
 {key:"email",kicker:"Prazer, {nome}.",title:"Qual é o seu melhor e-mail profissional?",label:"E-MAIL PROFISSIONAL",type:"email",placeholder:"voce@empresa.com"},
 {key:"whatsapp",kicker:"Seu e-mail já está conosco.",title:"Por qual WhatsApp nossa equipe pode falar com você?",label:"WHATSAPP",type:"tel",placeholder:"(27) 99999-9999"},
 {key:"momento",kicker:"Agora, vamos entender seu cenário.",title:"Em qual momento o seu negócio está?",type:"options",options:["Começando agora","Validando uma oferta","Em crescimento","Pronto para escalar"]},
 {key:"objetivo",kicker:"Quase lá.",title:"Qual é o seu principal objetivo digital hoje?",type:"options",options:["Criar ou renovar meu site","Gerar mais oportunidades","Automatizar processos","Estruturar uma solução sob medida"]},
 {key:"investimento",kicker:"Última pergunta.",title:"Qual faixa de investimento você considera para este projeto?",type:"options",options:["Até R$ 3 mil","R$ 3 mil a R$ 8 mil","R$ 8 mil a R$ 15 mil","Acima de R$ 15 mil"]}
];
const answers={};let current=0;
const stage=document.getElementById("questionStage"),stepNumber=document.getElementById("stepNumber"),progressBar=document.getElementById("progressBar"),backButton=document.getElementById("backButton"),form=document.getElementById("diagnosticForm"),proof=document.getElementById("proofBlock");
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function render(){
 const step=steps[current];stepNumber.textContent=String(current+1).padStart(2,"0");progressBar.style.width=((current+1)/steps.length*100)+"%";backButton.textContent=current===0?"VOLTAR":"ANTERIOR";
 const kicker=step.kicker.replace("{nome}",answers.nome?escapeHtml(answers.nome.split(" ")[0]):"");
 let answer;
 if(step.type==="options"){answer='<div class="answer-options">'+step.options.map(o=>'<button type="button" class="option-button" data-value="'+escapeHtml(o)+'" aria-pressed="'+(answers[step.key]===o)+'">'+escapeHtml(o)+'</button>').join("")+'</div>'}
 else{answer='<label class="field-label" for="activeAnswer">'+step.label+'</label><input class="answer-input" id="activeAnswer" type="'+step.type+'" value="'+escapeHtml(answers[step.key]||"")+'" placeholder="'+step.placeholder+'" autocomplete="'+(step.key==="nome"?"name":step.key==="email"?"email":step.key==="whatsapp"?"tel":"off")+'">'}
 stage.innerHTML='<div class="step-view"><p class="question-kicker">'+kicker+'</p><h2 class="question-title">'+step.title+'</h2>'+answer+'<p class="error-message" id="errorMessage" role="alert"></p><div class="stage-actions"><button class="continue-button" type="button">'+(current===steps.length-1?"RECEBER MEU DIAGNÓSTICO":"PROSSEGUIR")+'</button></div></div>';
 stage.querySelectorAll(".option-button").forEach(btn=>btn.addEventListener("click",()=>{answers[step.key]=btn.dataset.value;stage.querySelectorAll(".option-button").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)))}));
 stage.querySelector(".continue-button").addEventListener("click",next);
 const input=stage.querySelector(".answer-input");if(input){input.focus();input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();next()}})}
}
function next(){
 const step=steps[current],input=stage.querySelector(".answer-input");if(input)answers[step.key]=input.value.trim();const error=document.getElementById("errorMessage");
 if(!answers[step.key]){error.textContent="Preencha esta informação para prosseguir.";return}
 if(step.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)){error.textContent="Digite um e-mail válido.";return}
 if(step.type==="tel"&&answers.whatsapp.replace(/\D/g,"").length<10){error.textContent="Digite um WhatsApp com DDD.";return}
 if(current<steps.length-1){current++;render();return}finish()
}
function finish(){
 steps.forEach(s=>{const input=document.createElement("input");input.type="hidden";input.name=s.key;input.value=answers[s.key];form.appendChild(input)});proof.hidden=true;
 stage.innerHTML='<div class="success-state"><p class="question-kicker">Diagnóstico concluído.</p><h2>Obrigado, '+escapeHtml((answers.nome||"").split(" ")[0])+'.</h2><p>Suas respostas estão prontas. Clique abaixo para enviá-las com segurança à nossa equipe.</p><button class="continue-button" id="sendLead" type="button">ENVIAR RESPOSTAS</button></div>';
 document.getElementById("sendLead").addEventListener("click",()=>form.submit())
}
backButton.addEventListener("click",()=>{if(current===0){location.href="institucional.html"}else{current--;render()}});
if(new URLSearchParams(location.search).get("enviado")==="1"){proof.hidden=true;stage.innerHTML='<div class="success-state"><p class="question-kicker">Tudo certo.</p><h2>Recebemos seu diagnóstico.</h2><p>Nossa equipe entrará em contato em até 24 horas úteis.</p><a class="success-link" href="institucional.html">VOLTAR PARA A KLAVE</a></div>';progressBar.style.width="100%";stepNumber.textContent="06"}else render();