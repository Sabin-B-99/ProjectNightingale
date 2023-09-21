package com.projectnight.repository.songs;

import com.projectnight.entity.songs.HarmonicaTabOtherReqDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface HarmonicaTabOtherReqDetailsRepository extends JpaRepository<HarmonicaTabOtherReqDetails, UUID> {
    @Query("FROM HarmonicaTabOtherReqDetails WHERE songTab.id = :id")
    HarmonicaTabOtherReqDetails findHarmonicaTabOtherReqDetailsByTabId(@Param("id") UUID id);
}
