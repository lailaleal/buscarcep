import axios from "axios";
import { Input, Button, Typography, Alert, Spin } from "antd";
import { useState } from "react";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function App() {
  const [cep, setCep] = useState("");
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCepData = async () => {
    if (!cep || cep.length !== 8) {
      setError("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCepData(null);
      const response = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
      );
      setCepData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("CEP não encontrado ou inválido.");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-auto">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto my-4 px-4">
        <div className="backdrop-blur-md bg-white/30 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="bg-white rounded-full p-3 sm:p-4 shadow-lg">
                  <EnvironmentOutlined className="text-2xl sm:text-4xl text-emerald-500" />
                </div>
              </div>
              <Title 
                level={2} 
                className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-white"
                style={{ margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
              >
                Localizador de CEP
              </Title>
              <Text className="text-white/90 text-base sm:text-lg">
                Encontre endereços em todo o Brasil
              </Text>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Input
                  placeholder="Digite o CEP (somente números)"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // regex
                  maxLength={8}
                  size="large"
                  onPressEnter={fetchCepData}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="h-12 sm:h-14 text-base sm:text-lg rounded-xl"
                  style={{ 
                    backgroundColor: "rgba(255,255,255,0.8)", 
                    border: "none", 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    paddingRight: "6rem"
                  }}
                />
              </div>
              
              <Button 
                block 
                onClick={fetchCepData}
                loading={loading}
                style={{ 
                  height: "48px", 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(255,106,136,0.4)"
                }}
                className="h-11 sm:h-12 md:h-14 text-base sm:text-lg hover:opacity-90 active:opacity-100 transition-opacity focus:outline-none"
              >
                {loading ? 'Buscando...' : 'Buscar Endereço'}
              </Button>
            </div>

            {error && (
              <Alert
                message="Erro na busca"
                description={error}
                type="error"
                showIcon
                className="mt-4 sm:mt-6 rounded-xl text-sm sm:text-base"
                style={{ 
                  border: "none", 
                  background: "rgba(255, 82, 82, 0.15)", 
                  backdropFilter: "blur(10px)" 
                }}
              />
            )}

            {loading && (
              <div className="flex justify-center my-6 sm:my-8">
                <Spin size="large" style={{ color: "#ffffff" }} />
              </div>
            )}

            {cepData && (
              <div 
                className="mt-6 sm:mt-8 backdrop-blur-md bg-white/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30"
                role="region"
                aria-label="Informações do endereço"
              >
                <h3 className="text-center mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                  <EnvironmentOutlined className="text-xl" />
                  <span>Endereço Encontrado</span>
                </h3>
                
                <div className="grid gap-3 sm:gap-4">
                  {/* CEP Item */}
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 sm:p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                    tabIndex="0"
                  >
                    <span className="text-white/80 text-xs sm:text-sm block mb-1">CEP</span>
                    <div className="font-semibold text-lg sm:text-xl text-white">
                      {cepData.cep}
                    </div>
                  </div>
                  
                  {/* Logradouro Item */}
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 sm:p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                    tabIndex="0"
                  >
                    <span className="text-white/80 text-xs sm:text-sm block mb-1">Logradouro</span>
                    <div className="font-semibold text-lg sm:text-xl text-white">
                      {cepData.street || "Não disponível"}
                    </div>
                  </div>
                  
                  {/* Bairro Item */}
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 p-3 sm:p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                    tabIndex="0"
                  >
                    <span className="text-white/80 text-xs sm:text-sm block mb-1">Bairro</span>
                    <div className="font-semibold text-lg sm:text-xl text-white">
                      {cepData.neighborhood || "Não disponível"}
                    </div>
                  </div>
                  
                  {/* Cidade Item */}
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-red-500 p-3 sm:p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                    tabIndex="0"
                  >
                    <span className="text-white/80 text-xs sm:text-sm block mb-1">Cidade</span>
                    <div className="font-semibold text-lg sm:text-xl text-white">
                      {cepData.city}
                    </div>
                  </div>
                  
                  {/* Estado Item */}
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
                    tabIndex="0"
                  >
                    <span className="text-white/80 text-xs sm:text-sm block mb-1">Estado</span>
                    <div className="font-semibold text-lg sm:text-xl text-white">
                      {cepData.state}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}