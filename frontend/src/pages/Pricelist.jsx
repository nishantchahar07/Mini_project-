import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../components/Dashboard/DashboardLayout'


export default function PriceList({ language = 'en', setLanguage }) {
  const [products, setProducts] = useState([])
  const [texts, setTexts] = useState({})
  const [editingField, setEditingField] = useState(null)
  const [searchFilters, setSearchFilters] = useState({
    articleNo: '',
    productName: ''
  })
  const navigate = useNavigate()

  // Check authentication
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate])

  // Load translations
  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`http://localhost:3000/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Pricelist i18n load error", error)
    }
  }

  // Load products from backend
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  // Update a product field
  async function updateProductField(productId, field, value) {
    try {
      const token = sessionStorage.getItem('token')
      await axios.patch(`http://localhost:3000/api/products/${productId}/field`, {
        field,
        value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      // Update local state
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, [field]: field.includes('price') ? parseFloat(value) : value }
            : product
        )
      )
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  // Handle field editing
  const handleFieldEdit = (productId, field, value) => {
    setEditingField(null)
    if (value !== undefined) {
      updateProductField(productId, field, value)
    }
  }

  // Filter products based on search
  const filteredProducts = products.filter(product => {
    const articleMatch = product.id.toString().toLowerCase().includes(searchFilters.articleNo.toLowerCase())
    const nameMatch = product.name.toLowerCase().includes(searchFilters.productName.toLowerCase())
    return articleMatch && nameMatch
  })

  // Editable field component
  const EditableField = ({ product, field, value, className = "" }) => {
    const [tempValue, setTempValue] = useState(value)
    const isEditing = editingField === `${product.id}-${field}`
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleFieldEdit(product.id, field, tempValue)
      } else if (e.key === 'Escape') {
        setTempValue(value)
        setEditingField(null)
      }
    }

    if (isEditing) {
      return (
        <input
          type={field.includes('price') || field === 'vat_rate' ? 'number' : 'text'}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={() => handleFieldEdit(product.id, field, tempValue)}
          onKeyDown={handleKeyPress}
          className={`pr-pill ${className} pr-editing`}
          autoFocus
        />
      )
    }

    return (
      <div 
        className={`pr-pill ${className} pr-editable`}
        onClick={() => {
          setEditingField(`${product.id}-${field}`)
          setTempValue(value)
        }}
      >
        {field.includes('price') ? parseFloat(value).toFixed(2) : value}
      </div>
    )
  }

  return (
    <DashboardLayout language={language} setLanguage={setLanguage}>
      <div className="pr-main-content">
        <div className="pr-content">
          {/* Search and Controls */}
          <div className="pr-controls">
            <div className="pr-searches">
              <input 
                className="pr-input" 
                placeholder={texts.searchArticle || "Search Article No..."} 
                value={searchFilters.articleNo}
                onChange={(e) => setSearchFilters(prev => ({...prev, articleNo: e.target.value}))}
              />
              <input 
                className="pr-input" 
                placeholder={texts.searchProduct || "Search Product..."} 
                value={searchFilters.productName}
                onChange={(e) => setSearchFilters(prev => ({...prev, productName: e.target.value}))}
              />
            </div>
            <div className="pr-actions">
              <button className="pr-btn">{texts.newProduct || 'New Product'}</button>
              <button className="pr-btn">{texts.printList || 'Print List'}</button>
              <button className="pr-btn">{texts.advancedMode || 'Advanced mode'}</button>
            </div>
          </div>

          {/* Products Table */}
          <div className="pr-table">
            <div className="pr-thead">
              <div className="pr-th-article">{texts.articleNo || 'Article No.'}</div>
              <div className="pr-th-product">{texts.productService || 'Product/Service'}</div>
              <div className="pr-th-inprice">{texts.inPrice || 'In Price'}</div>
              <div className="pr-th-price">{texts.price || 'Price'}</div>
              <div className="pr-th-unit">{texts.unit || 'Unit'}</div>
              <div className="pr-th-stock">{texts.inStock || 'In Stock'}</div>
              <div className="pr-th-desc">{texts.description || 'Description'}</div>
            </div>

            <div className="pr-table-body">
              {filteredProducts.map((product) => (
              <div className="pr-row" key={product.id}>
                <div className="pr-pill pr-article" data-label="Article No.">{product.id}</div>
                <EditableField 
                  product={product} 
                  field="name" 
                  value={product.name} 
                  className="pr-product" 
                />
                <EditableField 
                  product={product} 
                  field="in_price" 
                  value={product.in_price} 
                  className="pr-inprice" 
                />
                <EditableField 
                  product={product} 
                  field="price" 
                  value={product.price} 
                  className="pr-price" 
                />
                <EditableField 
                  product={product} 
                  field="unit" 
                  value={product.unit} 
                  className="pr-unit" 
                />
                <div className="pr-pill pr-stock" data-label="In Stock">0</div>
                <EditableField 
                  product={product} 
                  field="description" 
                  value={product.description || ''} 
                  className="pr-desc" 
                />
              </div>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="pr-empty">
              <p>{texts.noProducts || 'No products found'}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
