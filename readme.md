# Мини-парсер списка из документа

Парсит список из документа в json

Формат списка:

  1. Название<br>
    1.1. Название
      - Название

Результат:

```
 [
  {
    id: 1,
    title: 'Название',
    description: [
      {
        id: 2,
        title: 'Название',
        description: ['Название']
      }
    ]
  }
 ]
```