package br.com.spring.banco.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import br.com.spring.banco.model.Pais;

public interface PaisRepository extends CrudRepository<Pais, Long> {

	@Query("SELECT p FROM Pais p WHERE p.nome LIKE :nome%")
	Iterable<Pais> findByNome(String nome);
}
