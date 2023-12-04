'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

function CategorySelector() {
  const [pending, setPending] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setPending(true);
    fetch('/api/get-categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setCategories(data.data);
          setPending(false);
        }
      });
  }, []);
  return (
    <div className='relative'>
      <Select disabled={pending} name="category_id" required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" className="w-[250px]" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((item: { id: string; name: string }) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CategorySelector;
