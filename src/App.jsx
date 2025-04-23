import React, { useState } from "react";
import * as XLSX from "xlsx";
import saveAs from "file-saver";

export default function App() {
  const [form, setForm] = useState(getEmptyForm());
  const [dados, setDados] = useState([]);

  function getEmptyForm() {
    return {
      setor: "",
      tipoEquipamento: "",
      nomeCliente: "",
      marca: "",
      btu: "",
      dataOrcamento: "",
      descricaoServico: "",
      rubricaCliente: "",
      tipo: "orçamento",
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const adicionarFormulario = (e) => {
    e.preventDefault();
    setDados((prev) => [
      ...prev,
      {
        ...form,
        dataOrcamento: new Date(form.dataOrcamento).toLocaleDateString(),
      },
    ]);
    setForm(getEmptyForm());
    alert("Formulário adicionado à lista.");
  };

  const exportarExcel = () => {
    if (dados.length === 0) {
      alert("Nenhum formulário foi adicionado.");
      return;
    }

    const dadosFiltrados = dados.map((item) => ({
      Setor: item.setor,
      tipoEquipamento: item.tipoEquipamento,
      Cliente: item.nomeCliente,
      Marca: item.marca,
      btu: item.btu,
      dataorçamento: item.dataOrcamento,
      descricaoServico: item.descricaoServico,
      tipo: item.tipo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orçamentos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `orcamentos_${Date.now()}.xlsx`);

    alert("Arquivo Excel exportado com sucesso!");
    setDados([]);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container} className="fade-in">
        <h1 style={styles.title}>Formulário Técnico</h1>
        <form onSubmit={adicionarFormulario} style={styles.form}>
          <Field
            label="Setor"
            name="setor"
            value={form.setor}
            onChange={handleChange}
          />
          <div style={styles.field}>
            <label style={styles.label}>Tipo de Equipamento</label>
            <select
              name="tipoEquipamento"
              value={form.tipoEquipamento}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione</option>
              {[
                "ACJ",
                "PISO TETO",
                "SELF",
                "FANCOIL",
                "CHILLER",
                "K7",
                "PORTÁTIL",
              ].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Nome do Cliente"
            name="nomeCliente"
            value={form.nomeCliente}
            onChange={handleChange}
          />

          <div style={styles.field}>
            <label style={styles.label}>Marca</label>
            <select
              name="marca"
              value={form.marca}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione</option>
              {[
                "CARRIER",
                "MIDEA",
                "SPRINGER",
                "YORK",
                "LG",
                "DAIKIN",
                "ELECTROLUX",
                "PHILCO",
                "BRIANIA",
                "GREE",
                "AGRATTO",
                "VIX",
                "SAMSUNG",
                "FUJITSU",
                "TRANE",
                "PANASONIC",
                "HATACHI",
                "CONSUL",
                "KOMECO",
                "COMFEE",
                "MAXIFLEX",
                "RINETTO",
                "FONTAINE",
                "VOGGA",
                "ADMIRAL",
                "OLIMPIA SPLENDID",
                "ELGIN",
                "TCL",
                "TEMPSTAR",
                "SANYO",
                "TROCALOR",
              ].map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>BTU</label>
            <select
              name="btu"
              value={form.btu}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione</option>
              {[
                "7.000",
                "7.500",
                "9.000",
                "10.000",
                "11.000",
                "12.000",
                "15.000",
                "18.000",
                "21.000",
                "22.000",
                "24.000",
                "30.000",
                "36.000",
                "48.000",
                "56.000",
                "57.000",
                "60.000",
                "72.000",
                "80.000",
                "90.000",
                "120.000",
                "144.000",
                "240.000",
                "3TR",
                "5TR",
                "6TR",
                "10TR",
                "12TR",
                "20TR",
              ].map((btu) => (
                <option key={btu} value={btu}>
                  {btu}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Data do Orçamento"
            name="dataOrcamento"
            type="date"
            value={form.dataOrcamento}
            onChange={handleChange}
          />

          <div style={styles.field}>
            <label style={styles.label}>Descricão do Serviço</label>
            <select
              name="descricaoServico"
              value={form.descricaoServico}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Selecione</option>
              {[
                "SERVIÇO DE MANUTENÇÃO PREVENTIVA DA CONDENSADORA COM DIAGNÓSTICO.",
                "SERVIÇO DE MANUTENÇÃO PREVENTIVA DA EVAPORADORA COM DIAGNÓSTICO.",
                "RECARGA DE GÁS 1KG",
                "RECARGA DE GÁS 2KGS",
                "RECARGA DE GÁS 3KGS",
                "RECARGA DE GÁS 4KGS",
                "RECARGA DE GÁS 5KGS",
                "RECARGA DE GÁS 6KGS",
                "RECARGA DE GÁS 7KGS",
                "RECARGA DE GÁS 8KGS",
                "RECARGA DE GÁS 9KGS",
                "RECARGA DE GÁS 10KGS",
                "TROCA DE CAPACITOR",
                "TROCA DE TERMOSTATO",
                "TROCA DE SENSOR DE TEMPERATURA",
                "TROCA DE CONTROLE REMOTO",
                "TROCA DA PLACA ELETRONICA RECEPTORA",
                "TROCA DA PLACA ELETRONICA DA CONDENSADORA",
                "TROCA DA PLACA ELETRONICA DA EVAPORADORA",
                "TROCA DA PLACA ELETRONICA UNIVERSAL",
                "TROCA DO COMPRESSOR",
                "TROCA DE MOTOR DE VENTILADOR DA EVAPORADORA",
                "TROCA DE MOTOR DE VENTILADOR DA CONDENSADORA",
                "TROCA DE SERPENTINA DA CONDENSADORA",
                "TROCA DE SERPENTINA DA EVAPORADORA",
                "OLIMPIA TROCA DO CONJUNTO DE FILTROS",
                "TROCA DAS ALETAS",
                "TROCA DE SENSOR DE TEMPERATURA",
                "TROCA DA VÁLVULA DE EXPANSÃO",
                "TROCA DA HÉLICE",
                "BOMBA DE DRENO",
                "INSTALACÃO DE AR CONDICIONADO (DISTÂNCIA VIDE OBS)",
                "DESISTALACÃO DO APARELHO",
                "TROCA DA CHAVE INVERSORA",
                "TROCA DO FILTRO SECADOR",
                "TROCA DO GABINETE",
                "TROCA DO MOTOR DA ALETA",
                "TROCA DE RELÊ",
                "TROCA DA TURBINA",
                "TROCA DO MOTOR DA TURBINA",
                "TROCA DA GRADE DA CONDENSADORA",
                "TROCA DA CALHA",
                "TROCA DA CHAVE TERMOSTÁTICA",
                "TROCA DA CÂMARA DO VENTILADOR",
                "TROCA DA MANGUEIRA DO DRENO",
                "TROCA DO PAINEL",
                "TROCA DO SENSOR DE DEGELO",
                "TROCA DO DUTO DE AR",
                "TROCA DO BOTÃO",
                "TROCA DOS CALCOS DE BORRACHA",
                "TROCA DO SUPORTE DA CONDENSADORA",
                "TROCA DO SUPORTE DA EVAPORADORA",
                "TROCA DO CAPILAR",
                "TROCA DAS CONEXÕES DE COBRE",
                "TROCA DO PISTÃO",
                "TROCA DA CHAVE DE FLUXO",
                "TROCA DE CONTROLE DE TEMPERATURA",
                "TROCA DA BOBINA SOLENÓIDE",
                "TROCA DA CHAVE SELETORA",
                "TROCA DO PRESSOSTATO",
                "TROCA DA VÁLVULA DE SERVICO",
                "TROCA DA CONTATORA",
                "TROCA DA BOBINA DA VÁLVULA",
                "TROCA DO PAINEL DE CONTROLE",
                "APLICACÃO DE NITROGENIO 1KG",
                "APLICACÃO DE NITROGENIO 2KG",
                "APLICACÃO DE NITROGENIO 3KG",
                "SOLDA PARA SANAR VAZAMENTO",
                "APERTO DAS PORCAS",
                "DESMONTAGEM PARCIAL DA EVAPORADORA",
                "DESMONTAGEM PARCIAL DA CONDENSADORA",
              ].map((descricao) => (
                <option key={descricao} value={descricao}>
                  {descricao}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Tipo:</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={form.tipo === "orçamento"}
                  onChange={() => setForm({ ...form, tipo: "orçamento" })}
                />
                Orçamento
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.tipo === "execução"}
                  onChange={() => setForm({ ...form, tipo: "execução" })}
                />
                Execução
              </label>
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Adicionar Formulário
          </button>
          <button type="button" onClick={exportarExcel} style={styles.button}>
            Exportar para Excel
          </button>
        </form>

        <p style={{ marginTop: 10, color: "#0f0" }}>
          Formulários adicionados: {dados.length}
        </p>
      </div>
    </div>
  );
}

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  multiline = false,
}) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...styles.input, height: 80 }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    )}
  </div>
);

const styles = {
  pageWrapper: {
    backgroundColor: "#ccc",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    maxWidth: 600,
    width: "100%",
    padding: 20,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#111",
    color: "#0f0",
    borderRadius: 10,
    boxShadow: "0 0 10px #0f0",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 4,
    color: "#0f0",
  },
  input: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#222",
    color: "#0f0",
    border: "1px solid #0f0",
  },
  button: {
    padding: 10,
    backgroundColor: "#0f0",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};
