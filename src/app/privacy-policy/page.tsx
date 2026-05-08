import React from 'react';

export const metadata = {
  title: 'Política de Privacidade | Gerency Leads',
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6, color: '#1e293b' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Política de Privacidade</h1>
      <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>1. Introdução</h2>
        <p style={{ marginBottom: '1rem' }}>
          O <strong>Gerency Leads</strong> ("nós", "nosso") respeita a sua privacidade e está comprometido em proteger as suas informações pessoais. 
          Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e compartilhamos os seus dados quando você utiliza nossa plataforma 
          e nossas integrações, incluindo a integração com os aplicativos e serviços da Meta (Facebook, Instagram, Messenger).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>2. Informações que Coletamos da Meta</h2>
        <p style={{ marginBottom: '1rem' }}>
          Ao conectar sua conta do Facebook ou Instagram ao Gerency Leads, podemos solicitar acesso a informações específicas através das APIs da Meta para 
          fornecer nossos serviços de gestão de atendimento omnichannel. Os dados coletados incluem:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
          <li>Informações públicas do perfil (Nome, foto de perfil).</li>
          <li>Conteúdo de mensagens diretas enviadas para sua página do Facebook ou conta comercial do Instagram, estritamente para o propósito de gerenciamento do atendimento via nossa caixa de entrada (Inbox).</li>
          <li>Tokens de autenticação seguros para manter a conexão entre a plataforma e suas contas sociais.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>3. Como Usamos as Informações</h2>
        <p style={{ marginBottom: '1rem' }}>Utilizamos as informações coletadas estritamente para:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
          <li>Permitir que você visualize e responda a mensagens de seus clientes (leads) diretamente pelo painel do Gerency Leads.</li>
          <li>Fornecer métricas e relatórios gerenciais sobre o volume de atendimento.</li>
          <li>Garantir o funcionamento técnico e seguro da integração entre os nossos sistemas e os da Meta.</li>
        </ul>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Importante:</strong> Não usamos o conteúdo das mensagens dos seus clientes para fins de publicidade direcionada, nem o vendemos ou compartilhamos com terceiros para quaisquer outros fins não relacionados à prestação do nosso serviço de CRM.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>4. Armazenamento e Segurança dos Dados</h2>
        <p style={{ marginBottom: '1rem' }}>
          Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados pessoais e as informações de seus clientes contra acesso, 
          alteração, divulgação ou destruição não autorizados. Os dados são processados de forma segura e armazenados apenas pelo tempo necessário para cumprir as finalidades do serviço.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>5. Compartilhamento de Dados</h2>
        <p style={{ marginBottom: '1rem' }}>
          Nós não compartilhamos, vendemos ou alugamos suas informações pessoais ou as mensagens dos seus clientes para terceiros, exceto quando exigido por lei 
          ou sob solicitação formal de autoridades judiciais competentes.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>6. Seus Direitos (Deleção de Dados)</h2>
        <p style={{ marginBottom: '1rem' }}>
          Conforme exigido pelos Termos da Plataforma da Meta e legislações de proteção de dados aplicáveis, você tem o direito de solicitar a remoção de seus dados.
          Se você desejar que removamos a sua integração com a Meta e apaguemos todos os dados associados a ela, você pode:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
          <li>Desconectar o aplicativo "Gerency Leads" acessando as configurações de "Integrações de Negócios" no seu perfil do Facebook.</li>
          <li>Solicitar a exclusão total da sua conta e dos dados através do suporte direto na nossa plataforma.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>7. Contato</h2>
        <p style={{ marginBottom: '1rem' }}>
          Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato conosco através do suporte oficial do sistema.
        </p>
      </section>
    </div>
  );
}
