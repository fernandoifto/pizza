// Indica que este é um componente do lado do cliente no Next.js
"use client"

// Importações necessárias
import { ChangeEvent, useState } from 'react'        // Hooks do React
import styles from './styles.module.scss'           // Estilos CSS Modules
import { UploadCloud } from 'lucide-react'          // Ícone de upload
import Image from 'next/image'                      // Componente de imagem otimizado do Next.js
import { Button } from '@/app/dashboard/components/button'  // Componente de botão personalizado
import { api } from '@/services/api'                // Cliente HTTP configurado
import { getCookieClient } from '@/lib/cookieClient'  // Utilitário para manipulação de cookies
import { toast } from 'react-toastify' // Importa o Toaster do React Toastify que exibe notificações
import { useRouter } from 'next/navigation' 

// Interfaces para tipagem TypeScript

// Define a estrutura de uma categoria
interface CategoryProps {
  id: string;      // Identificador único da categoria
  name: string;    // Nome da categoria
}

// Props que o componente Form recebe
interface Props {
  categories: CategoryProps[]  // Lista de categorias disponíveis
}

/**
 * Componente Form - Formulário para cadastro de novos produtos
 * @param categories - Lista de categorias disponíveis para seleção
 */
export function Form({ categories }: Props) {
  const router = useRouter();
  // Estado para armazenar o arquivo de imagem selecionado
  const [image, setImage] = useState<File>()
  // Estado para armazenar a URL de pré-visualização da imagem
  const [previewImage, setPreviewImage] = useState("")

  /**
   * Função para lidar com o envio do formulário
   * @param formData - Dados do formulário
   */
  async function handleRegisterProduct(formData: FormData) {

    const categoryIndex = Number(formData.get("category"))
    const name = formData.get("name")
    const price = formData.get("price")
    const description = formData.get("description")

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos")
      return;
    }

    const data = new FormData();

    // Adicionar dados ao FormData
    data.append("name", name)
    data.append("price", price)
    data.append("description", description)
    data.append("category_id", categories[categoryIndex].id)
    data.append("banner", image)

    const token = getCookieClient();

    // Enviar dados para a API
    await api.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .catch((err) => {
        console.log(err);
        toast.warning("Erro ao cadastrar o produto")
        return;
      })

    toast.success("Produto cadastrado com sucesso!");
    router.push("/dashboard")

  }

  /**
   * Função para lidar com a seleção de arquivo de imagem
   * @param e - Evento de mudança do input de arquivo
   */
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato de imagem inválido")
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image))

    }
  }


  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>
      
      {/* Formulário de cadastro de produto */}
      <form className={styles.form} action={handleRegisterProduct}>

        {/* Área de upload de imagem */}
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          {/* Input de arquivo oculto estilizado */}
          <input
            type="file"
            accept="image/png, image/jpeg"  // Aceita apenas PNG e JPEG
            required
            onChange={handleFile}
          />


          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}

        </label>

        {/* Seletor de categoria */}
        <select name="category" required>
          <option value="">Selecione uma categoria</option>
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          required
          className={styles.input}
        />

        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto..."
          required
          name="description"
        ></textarea>

        <Button name="Cadastrar produto" />

      </form>
    </main>
  )
}